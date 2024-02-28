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
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import qs from "query-string";

type Props = {
  totalItem: number;
  viewPerPage: number;
  currentPage: number;
};

const PaginationCustom = ({ currentPage, totalItem, viewPerPage }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const params = qs.parse(searchParams.toString());

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

  const handleNavigate = useCallback(
    (page: number) => {
      const query = {
        ...params,
        page,
      };

      return qs.stringifyUrl({
        url: window.location.href,
        query,
      });
    },
    [params]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (totalPage === 1) return null;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationPrevious
          href={isCanPrev ? handleNavigate(currentPage - 1) : ""}
        />
        <div className="hidden sm:flex flex-wrap">
          {(mode === "right" || mode === "center") && (
            <>
              <PaginationLink href={`?page=1`}>1</PaginationLink>

              <PaginationEllipsis />
            </>
          )}

          {pages.map((page) => (
            <PaginationLink
              key={page}
              isActive={page === currentPage}
              href={handleNavigate(page)}
            >
              {page}
            </PaginationLink>
          ))}

          {(mode === "left" || mode === "center") && (
            <>
              <PaginationEllipsis />

              <PaginationLink href={handleNavigate(totalPage)}>
                {totalPage}
              </PaginationLink>
            </>
          )}
        </div>

        <PaginationNext
          href={isCanNext ? handleNavigate(currentPage + 1) : ""}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
