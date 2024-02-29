"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";
import { CommentColumn } from "./columns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/ui/alert-modal";

type CellActionProps = {
  data: CommentColumn;
};

const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Comment ID copied to clipboard.");
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/comments/${data.id}`);
      toast.success(`Comment with id ${data.id} has been deleted.`);
      router.refresh();
    } catch (error) {
      toast.error("Make sure you are deleted informasi using this comment");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        isLoading={isLoading}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 w-4 h-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`comments/${data.id}`)}>
            <Edit className="mr-2 w-4 h-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
