import type { Image, Paragraph } from "mdast";
import type {
  DOMOutputSpec,
  Node as ProseMirrorNode,
  NodeSpec,
  Schema,
} from "prosemirror-model";
import remarkUnwrapImages from "remark-unwrap-images";
import type { Processor } from "unified";
import type { Node as UnistNode } from "unist";

import { NodeExtension } from "../../prosemirror-unified";

export class ImageExtension extends NodeExtension<Image | Paragraph> {
  public unifiedInitializationHook(
    processor: Processor<UnistNode, UnistNode, UnistNode, string>
  ): Processor<UnistNode, UnistNode, UnistNode, string> {
    return processor.use(remarkUnwrapImages);
  }

  public mdastNodeName(): "image" {
    return "image";
  }

  public proseMirrorNodeName(): string {
    return "image";
  }

  public proseMirrorNodeSpec(): NodeSpec {
    return {
      inline: false,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
      },
      group: "block",
      draggable: true,
      parseDOM: [
        {
          getAttrs(dom: Node | string): {
            src: string | null;
            alt: string | null;
            title: string | null;
          } {
            return {
              src: (dom as HTMLElement).getAttribute("src"),
              alt: (dom as HTMLElement).getAttribute("alt"),
              title: (dom as HTMLElement).getAttribute("title"),
            };
          },
          tag: "img[src]",
        },
      ],
      toDOM(node: ProseMirrorNode): DOMOutputSpec {
        return ["img", node.attrs];
      },
    };
  }

  public mdastNodeToProseMirrorNodes(
    node: Image,
    schema: Schema<string, string>,
    convertedChildren: Array<ProseMirrorNode>
  ): Array<ProseMirrorNode> {
    const proseMirrorNode = schema.nodes[
      this.proseMirrorNodeName()
    ].createAndFill(
      { src: node.url, alt: node.alt, title: node.title },
      convertedChildren
    );
    if (proseMirrorNode === null) {
      return [];
    }
    return [proseMirrorNode];
  }

  public proseMirrorNodeToMdastNodes(node: ProseMirrorNode): Array<Paragraph> {
    return [
      // The paragraph is needed to counter-balance remark-unwrap-images, otherwise stringification breaks
      {
        type: "paragraph",
        children: [
          {
            type: this.mdastNodeName(),
            url: node.attrs.src as string,
            title: node.attrs.title as string | null,
            alt: node.attrs.alt as string | null,
          },
        ],
      },
    ];
  }
}