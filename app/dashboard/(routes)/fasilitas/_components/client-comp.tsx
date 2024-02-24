"use client";

import { DataTable } from "@/components/ui/data-table";
import { FasilitasColumn, columns } from "./columns";

type Props = {
  data: FasilitasColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
