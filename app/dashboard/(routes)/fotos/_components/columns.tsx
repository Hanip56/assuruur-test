"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type FotoColumn = {
  id: string;
  description: string;
};

export const columns: ColumnDef<FotoColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
