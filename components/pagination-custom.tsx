"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

type Props = {
  totalItem: number;
  viewPerPage: number;
  currentPage: number;
};

const PaginationCustom = ({ currentPage, totalItem, viewPerPage }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const totalPage = Math.ceil(totalItem / viewPerPage);
  const isCanNext = currentPage >= 1 && currentPage < totalPage;
  const isCanPrev = currentPage !== 1;

  let pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isCanPrev ? `?page=${currentPage - 1}` : ""}
          />
        </PaginationItem>
        <div className="hidden sm:flex flex-wrap">
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                href={`?page=${page}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <PaginationItem>
          <PaginationNext href={isCanNext ? `?page=${currentPage + 1}` : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
