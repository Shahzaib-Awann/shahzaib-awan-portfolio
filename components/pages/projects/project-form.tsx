"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { projectFormSchema } from "@/lib/zod/schema";

import {
  Loader2,
  User,
  Slash,
  Heading,
  Image as ImageIcon,
  Layers,
  ExternalLink,
  CalendarArrowUp,
  CalendarArrowDown,
  Users,
  Star,
  Globe,
} from "lucide-react";

import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      slug: "",
      title: "",
      mainImage: undefined,
      shortDescription: "",
      description: "",
      category: "frontend",
      githubUrl: null,
      liveUrl: null,
      isFeatured: false,
      isPublished: true,
      startDate: "",
      endDate: "",
      client: "",
      teamSize: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    try {
      setIsLoading(true);
      toast.loading("Creating project...", { id: "project-create" });

      console.log(values);

      toast.success("Project created successfully!");
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
      toast.dismiss("project-create");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card w-full shadow flex flex-col gap-5 items-center rounded-2xl mt-10 p-10"
    >
      <div className="grid grid-cols-2 w-full gap-5">
        {/* TITLE */}
        <div className="flex flex-col col-span-2 gap-5 w-full">
          <label className="uppercase text-left">Title</label>

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Project Title"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <Heading className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* SLUG */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Slug</label>

          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="project-slug"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <Slash className="absolute size-5 -rotate-15 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Category</label>

          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <Field>
                <div className="relative w-full">
                  <Layers className="absolute size-5 -translate-y-1/2 top-1/2 left-4 text-black/50 hidden sm:block pointer-events-none" />

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-black text-base! border border-black/25 py-7 pl-12 pr-7 w-full overflow-hidden">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent className="bg-card" position="popper">
                      <SelectGroup>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Field>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 w-full gap-5">
        {/* SHORT DESCRIPTION */}
        <div className="flex flex-col gap-5 w-full">
          <label htmlFor="message-input-field" className="uppercase">
            Short Description{" "}
            <span className="text-xs text-muted-foreground">(Text)</span>
          </label>
          <Controller
            name="shortDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <textarea
                  {...field}
                  className="text-black w-full h-full max-h-100 min-h-25 border border-black/25 p-5 rounded-lg ring-0 outline-0"
                  placeholder="Write Short Description"
                  id="message-input-field"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-5 w-full">
          <label htmlFor="message-input-field" className="uppercase">
            Description{" "}
            <span className="text-xs text-muted-foreground">(markdown)</span>
          </label>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <textarea
                  {...field}
                  value={field.value ?? ""}
                  className="text-black w-full h-full max-h-100 min-h-50 border border-black/25 p-5 rounded-lg ring-0 outline-0"
                  placeholder="# Markdown Description"
                  id="message-input-field"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 w-full gap-5">
        {/* MAIN IMAGE */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Main Image</label>

          <Controller
            name="mainImage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <ImageIcon className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75 pointer-events-none" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-5">
        {/* GITHUB */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">GitHub URL</label>

          <Controller
            name="githubUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="GitHub URL"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <FaGithub className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* LIVE URL */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Live URL</label>

          <Controller
            name="liveUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Live URL"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <ExternalLink className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-5">
        {/* START DATE */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Start Date</label>

          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="date"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <CalendarArrowUp className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* END DATE */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">End Date</label>

          <Controller
            name="endDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type="date"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <CalendarArrowDown className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* TEAM */}
      <div className="grid grid-cols-2 w-full gap-5">
        {/* CLIENT */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Client</label>

          <Controller
            name="client"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Client name"
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <User className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* TEAM SIZE */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Team Size</label>

          <Controller
            name="teamSize"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  />
                  <Users className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75" />
                </div>

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* STATUS TOGGLES */}
      <div className="grid grid-cols-2 my-5 w-full gap-5">
        {/* IS FEATURED */}
        <Controller
          name="isFeatured"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between w-full border border-black/25 px-4 py-5 rounded-lg">
              <label
                htmlFor="is-featured-project-form"
                className="uppercase flex flex-row items-center gap-2"
              >
                <Star
                  className={`size-5  ${field.value ? "text-yellow-500 fill-yellow-500" : "text-black/75"}`}
                />
                <span>Featured</span>
              </label>

              <Button
                type="button"
                id="is-featured-project-form"
                onClick={() => field.onChange(!field.value)}
                className={`relative w-14 h-7 flex items-center rounded-full transition-all border ${
                  field.value
                    ? "bg-black border-black"
                    : "bg-transparent border-black/30"
                }`}
              >
                <span
                  className={`absolute size-5 bg-white rounded-full transition-all shadow ${
                    field.value ? "left-8" : "left-1"
                  }`}
                />
              </Button>
            </div>
          )}
        />

        {/* IS PUBLISHED */}
        <Controller
          name="isPublished"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between w-full border border-black/25 px-6 py-5 rounded-lg">
              <label
                htmlFor="is-published-project-form"
                className="uppercase flex flex-row items-center gap-2"
              >
                <Globe
                  className={`size-5  ${field.value ? "text-blue-500" : "text-black/75"}`}
                />
                <span>Published</span>
              </label>

              <Button
                type="button"
                id="is-published-project-form"
                onClick={() => field.onChange(!field.value)}
                className={`relative w-14 h-7 flex items-center rounded-full transition-all border ${
                  field.value
                    ? "bg-black border-black"
                    : "bg-transparent border-black/30"
                }`}
              >
                <span
                  className={`absolute rounded-full size-5 bg-white transition-all ${
                    field.value ? "left-8" : "left-1"
                  }`}
                />
              </Button>
            </div>
          )}
        />
      </div>

      {/* SUBMIT */}
      <Button
        disabled={isLoading}
        className="bg-black max-w-xl w-full text-white hover:bg-transparent hover:text-black border border-black px-10 py-8 text-sm rounded-none transition-all duration-300"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating...
          </span>
        ) : (
          "Create Project"
        )}
      </Button>
    </form>
  );
};

export default ProjectForm;
