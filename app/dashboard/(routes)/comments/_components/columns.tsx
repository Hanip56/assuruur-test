"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Button } from "@/components/ui/button";
import ApproveBtn from "./approve-btn";

export type CommentColumn = {
  id: string;
  informasiId: string;
  username: string;
  comment: string;
  date: string;
  isApprove: boolean;
};

export const columns: ColumnDef<CommentColumn>[] = [
  {
    accessorKey: "informasiId",
    header: "Comment on Informasi Id",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "isApprove",
    header: "Is Approved",
    cell: ({ row }) => (
      <ApproveBtn
        commentId={row.original.id}
        isApproved={row.original.isApprove}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
