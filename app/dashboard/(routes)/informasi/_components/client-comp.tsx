"use client";

import { DataTable } from "@/components/ui/data-table";
import { ArticleColumn, columns } from "./columns";

type Props = {
  data: ArticleColumn[];
};

const ClientComp = ({ data }: Props) => {
  return (
    <>
      <DataTable data={data} columns={columns} searchKey="title" />
    </>
  );
};

export default ClientComp;
