"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import AddNewDialog from "./form-dialog";
import DeleteTechnologyDialog from "./delete-technology-dialog";
import ProjectsPagination from "../projects/paginations";

type Technology = {
  id: number;
  name: string;
};

type Meta = {
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
};

export const TechnologiesDataTable = ({
  technologies,
  meta,
}: {
  technologies: Technology[];
  meta: Meta;
}) => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setDeleteOpen] = useState(false);

  const handleDelete = (tech: Technology) => {
    setSelectedTech(tech);
    setDeleteOpen(true);
  };

  const handleEdit = (tech: Technology) => {
    setSelectedTech(tech);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTech(null);
    setOpen(true);
  };

  return (
    <div className="w-full overflow-hidden flex flex-col items-end">
      <Button
        onClick={handleAdd}
        className="bg-black w-fit text-white hover:bg-transparent hover:text-black border border-black px-10 py-8 text-sm rounded-lg rounded-b-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Add Technology
      </Button>

      <div className="w-full bg-card">
        {/* Header */}
        <div className="grid rounded-tl-lg grid-cols-2 bg-muted p-4 font-semibold">
          <span>Name</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {technologies?.map((tech) => (
          <div
            key={tech.id}
            className="grid grid-cols-2 items-center p-4 border-t border-black/10"
          >
            <span>{tech.name}</span>

            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                className="size-8 text-center"
                onClick={() => handleEdit(tech)}
              >
                <Pencil className="size-4" />
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="size-8"
                onClick={() => handleDelete(tech)}
              >
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog (reuse same form) */}
      <AddNewDialog
        open={open}
        setOpen={setOpen}
        defaultValues={selectedTech}
        isEditing={!!selectedTech?.id}
      />

      <DeleteTechnologyDialog
        open={openDelete}
        setOpen={setDeleteOpen}
        selectedTech={selectedTech}
      />

      <ProjectsPagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        pageSize={meta.pageSize}
      />
    </div>
  );
};
