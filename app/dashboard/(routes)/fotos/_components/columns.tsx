"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type FotoColumn = {
  id: string;
  description: string;
  url: string;
};

export const columns: ColumnDef<FotoColumn>[] = [
  {
    accessorKey: "url",
    id: "preview",
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
    accessorKey: "url",
    id: "url",
    header: "URL",
    cell: ({ row }) => <p>{row.getValue("url")}</p>,
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
