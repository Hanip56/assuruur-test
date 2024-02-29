"use client";

import { DataTable } from "@/components/ui/data-table";
import { CommentColumn, columns } from "./columns";

type Props = {
  data: CommentColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="informasiId" />
    </>
  );
};

export default ClientComp;
