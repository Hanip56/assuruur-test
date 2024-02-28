"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type FasilitasColumn = {
  id: string;
  name: string;
  url: string;
  type: string;
};

export const columns: ColumnDef<FasilitasColumn>[] = [
  {
    accessorKey: "url",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-14 h-14 rounded-md">
        <Image
          src={row.original.url}
          alt=""
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
