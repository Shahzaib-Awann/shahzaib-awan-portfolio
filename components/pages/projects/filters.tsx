"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/lib/hooks/useDebounce";
import { Cpu, Layers, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// Define the shape of the filter state
type QueryState = {
  search: string;
  category: string;
  technology: string;
};

const ProjectsFilter = ({ initialQuery }: { initialQuery: QueryState }) => {
  const router = useRouter();

  // Initial state from URL
  const [query, setQuery] = useState<QueryState>({
    search: initialQuery.search,
    category: initialQuery.category,
    technology: initialQuery.technology,
  });

  // Debounced values
  const debouncedQuery = useDebounce<QueryState>(query, 500);

  // Update URL when debounced values change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.search) params.set("search", debouncedQuery.search);
    if (debouncedQuery.category && debouncedQuery.category !== "all")
      params.set("category", debouncedQuery.category);
    if (debouncedQuery.technology && debouncedQuery.technology !== "all")
      params.set("technology", debouncedQuery.technology);

    const url = `/projects?${params.toString()}`;
    router.replace(url);
  }, [debouncedQuery, router]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setQuery({ search: "", category: "", technology: "" });
  }, []);

  return (
    <div className="bg-card shadow p-6 rounded-md flex flex-col md:flex-row gap-4 md:gap-6 items-center">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Input
          type="text"
          variant="simple"
          value={query.search}
          onChange={(e) => setQuery({ ...query, search: e.target.value })}
          className="text-black text-base! border border-black/25 py-7 pl-12 pr-12 lg:pr-7 w-full"
          placeholder="Search Projects..."
          id="project-search-input"
          autoComplete="off"
        />
        <Search className="absolute size-5 -translate-y-1/2 top-1/2 left-4 text-black/50" />

        {/* Clear search input button */}
        {query.search && (
          <Button
            onClick={() => setQuery((prev) => ({ ...prev, search: "" }))}
            variant="ghost"
            className="absolute lg:hidden -translate-y-1/2 top-1/2 right-4 py-2 px-0 m-0"
          >
            <X className="size-5 text-black/50" />
          </Button>
        )}
      </div>

      {/* Filters: Category & Technology */}
      <div className="w-full md:w-fit flex flex-row gap-6">
        {/* Category Filter */}
        <div className="relative w-full md:w-fit">
          <Layers className="absolute size-5 -translate-y-1/2 top-1/2 left-4 text-black/50" />
          <Select
            value={query.category}
            onValueChange={(v) => setQuery({ ...query, category: v })}
          >
            <SelectTrigger className="text-black text-base! border border-black/25 py-7 px-12 pr-7 w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card" position="popper">
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Fullstack</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Technology Filter */}
        <div className="relative w-full md:w-fit">
          <Cpu className="absolute size-5 -translate-y-1/2 top-1/2 left-4 text-black/50" />
          <Select
            value={query.technology}
            onValueChange={(v) => setQuery({ ...query, technology: v })}
          >
            <SelectTrigger className="text-black text-base! border border-black/25 py-7 px-12 pr-7 w-full">
              <SelectValue placeholder="All Technologies" />
            </SelectTrigger>
            <SelectContent className="bg-card" position="popper">
              <SelectGroup>
                <SelectItem value="all">All Technologies</SelectItem>
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="reactjs">React.js</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Clear All Filters Button */}
      <Button
        type="button"
        onClick={clearFilters}
        className="text-black hidden lg:flex text-base border rounded-lg bg-transparent border-black/25 p-7 w-fit group hover:bg-foreground hover:text-white transition"
        id="project-search-input"
      >
        <X className="size-5 text-black/50 group-hover:text-white transition" />
        Clear
      </Button>
    </div>
  );
};

export default ProjectsFilter;
