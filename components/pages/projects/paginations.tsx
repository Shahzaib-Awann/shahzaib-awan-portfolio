"use client";

import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

export default function ProjectsPagination({
  currentPage,
  totalPages,
  pageSize,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
  
      params.set(key, String(value));
  
      // If pageSize changes, remove page completely (page 1 is default)
      if (key === "pageSize") {
        params.delete("page");
      }
  
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const goToPage = (page: number) => {
    const safePage = Math.max(1, Math.min(totalPages, page));
    updateParams("page", safePage);
  };

  return (
    <div className="bg-card w-full shadow p-6 rounded-md flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center">
      {/* Page Size */}
      <div className="flex flex-row items-center gap-5">
        <span className="text-sm text-black">Rows per page:</span>

        <Select
          value={String(pageSize)}
          onValueChange={(v) => updateParams("pageSize", Number(v))}
        >
          <SelectTrigger className="text-black border border-black/25 text-sm py-5 px-4 w-fit max-w-[120px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-card" position="popper">
            <SelectGroup>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center w-fit gap-2 justify-center md:justify-end">
        {/* First Page */}
        <Button
          size="icon"
          disabled={currentPage === 1}
          onClick={() => goToPage(1)}
          className="text-black flex text-base border rounded bg-transparent border-black/25 p-3 sm:p-5 aspect-square w-fit group hover:bg-foreground hover:text-white transition"
        >
          <ChevronsLeft className="size-5" />
        </Button>

        {/* Prev Page */}
        <Button
          size="icon"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="text-black flex text-base border rounded bg-transparent border-black/25 p-3 sm:p-5 aspect-square w-fit group hover:bg-foreground hover:text-white transition"
        >
          <ChevronLeft className="size-5" />
        </Button>

        {/* Current Page */}
        <Button size="icon" className="aspect-square p-3 border rounded border-black/25 bg-transparent text-black">
          {currentPage}
        </Button>

        {/* Next Page */}
        <Button
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="text-black flex text-base border rounded bg-transparent border-black/25 p-3 sm:p-5 aspect-square w-fit group hover:bg-foreground hover:text-white transition"
        >
          <ChevronRight className="size-5" />
        </Button>

        {/* Last Page */}
        <Button
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
          className="text-black flex text-base border rounded bg-transparent border-black/25 p-3 sm:p-5 aspect-square w-fit group hover:bg-foreground hover:text-white transition"
        >
          <ChevronsRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}