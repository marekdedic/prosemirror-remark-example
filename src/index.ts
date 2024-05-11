import "prosemirror-view/style/prosemirror.css";
import "prosemirror-example-setup/style/style.css";
import "prosemirror-menu/style/menu.css";

import { GFMExtension } from "prosemirror-remark";
import { EditorState } from "prosemirror-state";
import { ProseMirrorUnified } from "prosemirror-unified";
import { EditorView } from "prosemirror-view";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { defaultContent } from "./defaultContent";

const editor = document.querySelector("#editor")!;
const preview = document.querySelector("#preview-container")!;

const adapter = new ProseMirrorUnified([new GFMExtension()]);

async function updatePreview(source: string): Promise<void> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(source);

  preview.innerHTML = String(file);
}

const view = new EditorView(editor, {
  state: EditorState.create({
    doc: adapter.parse(defaultContent),
    plugins: [adapter.inputRulesPlugin(), adapter.keymapPlugin()],
    schema: adapter.schema(),
  }),
  nodeViews: adapter.nodeViews(),
  dispatchTransaction: (tr): void => {
    view.updateState(view.state.apply(tr));
    void updatePreview(adapter.serialize(view.state.doc));
  },
});

void updatePreview(defaultContent);
