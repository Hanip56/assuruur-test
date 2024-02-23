"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { TextAlignCenterIcon, TextAlignLeftIcon } from "@radix-ui/react-icons";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  ImageIcon,
  Heading1,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Quote,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="border border-input bg-transparent rounded-md p-2 flex flex-wrap gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 4 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 5 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }
      >
        <Heading5 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 6 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }
      >
        <Heading6 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <TextAlignLeftIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <TextAlignCenterIcon className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <TextAlignCenterIcon className="w-4 h-4" />
      </Toggle>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => {
          editor
            .chain()
            .focus()
            .selectParentNode()
            .setImage({
              src: "https://utfs.io/f/5fd1a569-ce83-40eb-a0e0-2c01aa75823a-kvu00e.jpg",
            })
            .run();
          // editor.chain().focus().insertContent(`<div>Hello World</div>`).run();
        }}
      >
        <ImageIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
