"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { FormEvent, useState } from "react";

type Props = {
  editor: Editor | null;
};

const ImageEditor = ({ editor }: Props) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editor || !url) return;

    editor
      .chain()
      .focus()
      .selectParentNode()
      .setImage({
        src: url,
      })
      .run();

    setUrl("");
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} onClick={() => setOpen(true)}>
          <ImageIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter image url."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button className="mt-4 w-full">Add</Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
