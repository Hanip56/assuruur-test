"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { UserRole } from "@prisma/client";

export type UserColumn = {
  id: string;
  name: string;
  role: UserRole;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
