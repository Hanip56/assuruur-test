"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./tiptap-toolbar";
import TextAlign from "@tiptap/extension-text-align";
import ImageTiptap from "@tiptap/extension-image";
import { Node } from "@tiptap/core";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

const CustomNode = Node.create({
  // Your code here
});
const Tiptap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      CustomNode,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({}),
      ImageTiptap.configure({
        HTMLAttributes: {
          class: "w-full",
        },
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-4xl min-h-40 max-h-96 overflow-y-auto dark:bg-white",
      },
    },
    content: description,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-2 w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
