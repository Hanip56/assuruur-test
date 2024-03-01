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
import { ArticleColumn } from "./columns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "@/components/ui/alert-modal";
import { getErrorMessage } from "@/lib/utils";

type CellActionProps = {
  data: ArticleColumn;
};

const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Informasi ID copied to clipboard.");
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/articles/${data.id}`);
      toast.success(`Informasi with id ${data.id} has been deleted.`);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
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
          <DropdownMenuItem onClick={() => router.push(`informasi/${data.id}`)}>
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
