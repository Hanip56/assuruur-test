"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type FasilitasTypeColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<FasilitasTypeColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
