"use client";

import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

const ProjectsPagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageSizes = [10, 20, 30, 40, 50];

  // Update URL helper
  const updateParams = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(key, String(value));

      // Reset page if pageSize changes
      if (key === "pageSize") {
        params.set("page", "1");
      }

      router.replace(`/projects?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="bg-card shadow p-4 rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
      
      {/* Record Info */}
      <div className="text-black text-sm">
        Showing {startItem} to {endItem} of {totalItems} rows
      </div>

      {/* Page Size */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-black">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => updateParams("pageSize", Number(e.target.value))}
          className="border border-black/25 rounded px-2 py-1 text-sm"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => updateParams("page", currentPage - 1)}
          className="px-3 py-1 border border-black/25 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers (limit to avoid huge lists) */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => updateParams("page", page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-black text-white"
                  : "border-black/25"
              }`}
            >
              {page}
            </button>
          ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => updateParams("page", currentPage + 1)}
          className="px-3 py-1 border border-black/25 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectsPagination;