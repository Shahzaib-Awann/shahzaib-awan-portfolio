import { TechnologiesDataTable } from "@/components/pages/technologies/data-table";
import { getAllTechnologies } from "@/lib/actions/technologies";
import React from "react";

type SearchParams = {
  page?: string;
  pageSize?: string;
};

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);

  const { data, meta } = await getAllTechnologies(page, pageSize);

  return (
    <div className="p-10">
      <h1 className="text-xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tight text-foreground  transition-all duration-300">
        Technologies
      </h1>

      <TechnologiesDataTable technologies={data} meta={meta} />
    </div>
  );
};

export default ProjectsPage;
