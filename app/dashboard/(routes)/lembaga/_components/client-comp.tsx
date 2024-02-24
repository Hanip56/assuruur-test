"use client";

import { DataTable } from "@/components/ui/data-table";
import { LembagaColumn, columns } from "./columns";

type Props = {
  data: LembagaColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
