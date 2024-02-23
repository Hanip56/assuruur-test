"use client";

import { DataTable } from "@/components/ui/data-table";
import { CategoryColumn, columns } from "./columns";

type Props = {
  data: CategoryColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
