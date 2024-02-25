"use client";

import { DataTable } from "@/components/ui/data-table";
import { FotoColumn, columns } from "./columns";

type Props = {
  data: FotoColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="description" />
    </>
  );
};

export default ClientComp;
