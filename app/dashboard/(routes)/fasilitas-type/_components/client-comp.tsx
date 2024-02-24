"use client";

import { DataTable } from "@/components/ui/data-table";
import { FasilitasTypeColumn, columns } from "./columns";

type Props = {
  data: FasilitasTypeColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
