"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import ImageTiptap from "@tiptap/extension-image";

type Props = {
  content: string;
};

const TiptapContent = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({}),
      ImageTiptap.configure({
        HTMLAttributes: {
          class: "w-full",
        },
      }),
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm md:prose-base max-w-full",
      },
    },
    content,
  });

  return <EditorContent editor={editor} />;
};

export default TiptapContent;
