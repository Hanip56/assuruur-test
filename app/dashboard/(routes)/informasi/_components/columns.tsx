"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ArticleColumn = {
  id: string;
  title: string;
  category: string;
};

export const columns: ColumnDef<ArticleColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
