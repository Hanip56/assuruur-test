"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

  let mode: "left" | "center" | "right" | undefined;

  if (totalPage > 6) {
    if (currentPage < 4) {
      mode = "left";
    } else if (currentPage > totalPage - 3) {
      mode = "right";
    } else {
      mode = "center";
    }
  }

  console.log({ mode });

  let pages = [];

  if (!mode) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  } else {
    let start = 1;
    let end = 4;

    if (mode === "right") {
      start = totalPage - 3;
      end = totalPage;
    } else if (mode === "center") {
      start = currentPage - 1;
      end = currentPage + 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (totalPage === 1) return null;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isCanPrev ? `?page=${currentPage - 1}` : ""}
          />
        </PaginationItem>
        <div className="hidden sm:flex flex-wrap">
          {(mode === "right" || mode === "center") && (
            <>
              <PaginationItem>
                <PaginationLink href={`?page=1`}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

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

          {(mode === "left" || mode === "center") && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`?page=${totalPage}`}>
                  {totalPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </div>
        <PaginationItem>
          <PaginationNext href={isCanNext ? `?page=${currentPage + 1}` : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
