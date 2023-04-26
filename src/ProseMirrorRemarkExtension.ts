import type { Node as ProseMirrorNode, Schema } from "prosemirror-model";
import type { Node as UnistNode } from "unist";

import type { SchemaExtension } from "./SchemaExtension";

export abstract class ProseMirrorRemarkExtension {
  // TODO: Maybe just one string?
  public abstract matchingMdastNodes(): Array<string>;

  // TODO: Maybe just one string?
  public abstract matchingProseMirrorNodes(): Array<string>;

  // TODO: Maybe just either one node or one mark?
  public abstract schema(): SchemaExtension;

  // TODO: There is some code duplication in the specializations of this method
  // TODO: Make this generic
  public abstract mdastNodeToProseMirrorNode(
    node: UnistNode,
    convertedChildren: Array<ProseMirrorNode>,
    schema: Schema
  ): Array<ProseMirrorNode>;

  // TODO: There is some code duplication in the specializations of this method
  // TODO: Make this generic
  public abstract proseMirrorNodeToMdastNode(
    node: ProseMirrorNode,
    convertedChildren: Array<UnistNode>
  ): Array<UnistNode>;
}