import type { Content, Root } from "mdast";
import type {
  Node as ProseMirrorNode,
  NodeSpec,
  Schema,
} from "prosemirror-model";

import { NodeExtension } from "../NodeExtension";

export class RootExtension extends NodeExtension<Root> {
  public mdastNodeName(): "root" {
    return "root";
  }

  public proseMirrorNodeName(): string {
    return "doc";
  }

  public proseMirrorNodeSpec(): NodeSpec {
    return { content: "block+" };
  }

  public mdastNodeToProseMirrorNodes(
    _node: Root,
    convertedChildren: Array<ProseMirrorNode>,
    schema: Schema<string, string>
  ): Array<ProseMirrorNode> {
    const proseMirrorNode = schema.nodes[
      this.proseMirrorNodeName()
    ].createAndFill({}, convertedChildren);
    if (proseMirrorNode === null) {
      return [];
    }
    return [proseMirrorNode];
  }

  public proseMirrorNodeToMdastNodes(
    _: ProseMirrorNode,
    convertedChildren: Array<Content>
  ): Array<Root> {
    return [{ type: this.mdastNodeName(), children: convertedChildren }];
  }
}
