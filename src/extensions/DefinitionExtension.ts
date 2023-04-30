import type { Definition } from "mdast";
import type { Node as ProseMirrorNode, Schema } from "prosemirror-model";

import type { ConverterContext } from "../ConverterContext";
import { NodeExtension } from "../NodeExtension";

export interface DefinitionExtensionContext {
  definitions: Record<
    string,
    { url: string; title: string | null | undefined }
  >;
}

export class DefinitionExtension extends NodeExtension<Definition> {
  public mdastNodeName(): "definition" {
    return "definition";
  }

  public proseMirrorNodeName(): null {
    return null; // TODO
  }

  public proseMirrorNodeSpec(): null {
    return null;
  }

  public mdastNodeToProseMirrorNodes(
    node: Definition,
    _convertedChildren: Array<ProseMirrorNode>,
    _schema: Schema<string, string>,
    context: ConverterContext<{
      DefinitionExtension: DefinitionExtensionContext;
    }>
  ): Array<ProseMirrorNode> {
    if (context.DefinitionExtension === undefined) {
      context.DefinitionExtension = { definitions: {} };
    }
    context.DefinitionExtension.definitions[node.identifier] = {
      title: node.title,
      url: node.url,
    };
    return [];
  }

  public proseMirrorNodeToMdastNodes(): Array<Definition> {
    return [];
  }
}
