"use client";

import { DataTable } from "@/components/ui/data-table";
import { TagColumn, columns } from "./columns";

type Props = {
  data: TagColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
