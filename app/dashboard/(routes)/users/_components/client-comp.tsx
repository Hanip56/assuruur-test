"use client";

import { DataTable } from "@/components/ui/data-table";
import { UserColumn, columns } from "./columns";

type Props = {
  data: UserColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="name" />
    </>
  );
};

export default ClientComp;
