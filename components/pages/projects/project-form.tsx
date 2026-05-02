"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
  Cpu,
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
import Image from "next/image";
import { MultiSelect } from "@/components/ui/multi-select";
import { ProjectInterface } from "@/lib/definations";
import RichTextEditor from "@/components/widgets/text-editor/rich-text-editor";

interface Props {
  technologies: {
    id: number;
    name: string;
  }[];

  data?: ProjectInterface;
}

const ProjectForm = ({ technologies = [], data }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [deletedGalleryImages, setDeletedGalleryImages] = useState<string[]>(
    [],
  );

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: undefined,
      slug: "",
      title: "",
      coverImage: undefined,
      shortSummary: "",
      fullDescription: "",
      category: "frontend",
      githubUrl: null,
      liveUrl: null,
      isFeatured: false,
      isPublished: true,
      startDate: "",
      endDate: "",
      client: "",
      teamSize: 1,

      galleryImages: [],
      technologies: [],
    },
  });

  const { control, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "galleryImages",
  });

  useEffect(() => {
    return () => {
      fields.forEach((_, index) => {
        const file = form.getValues(`galleryImages.${index}.imageUrl`);
        if (file instanceof File) {
          URL.revokeObjectURL(file as any);
        }
      });
    };
  }, [fields, form]);

  /* === Load Initial Values When Editing === */
  useEffect(() => {
    const isReady = !!data?.id;

    if (!isReady) return;

    form.reset({
      id: data.id ?? "",

      slug: data.slug ?? "",
      title: data.title ?? "",

      coverImage: data.coverImageUrl ?? "",

      shortSummary: data.shortSummary ?? "",
      fullDescription: data.fullDescription ?? "",

      category: data.category,

      githubUrl: data.githubUrl ?? null,
      liveUrl: data.liveUrl ?? null,

      isFeatured: data.isFeatured ?? false,
      isPublished: data.isPublished ?? false,

      startDate: data.startDate ?? "",
      endDate: data.endDate ?? "",

      client: data.client ?? "",
      teamSize: data.teamSize ?? 1,

      galleryImages:
        data.galleryImages?.map((img) => ({
          imageUrl: img.imageUrl,
          fileId: img.fileId ?? null,
        })) ?? [],

      technologies:
        data.technologies?.map((t) => ({
          id: t.id,
        })) ?? [],
    });

    setMainImagePreview(data?.coverImageUrl ?? null);
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    const API_URL = "/api/projects";
    const isEditing = !!data?.id;

    try {
      setIsLoading(true);
      toast.loading(isEditing ? "Updating project..." : "Creating project...", {
        id: "project-create",
      });

      // ===============================
      // 1. Prepare FormData
      // ===============================
      const formData = new FormData();

      const { coverImage, galleryImages, ...rest } = values;

      // JSON payload (non-file data)
      formData.append("data", JSON.stringify(rest));

      formData.append(
        "deleteGalleryImages",
        JSON.stringify(deletedGalleryImages),
      );

      // ===============================
      // 2. Handle cover image
      // ===============================
      if (coverImage instanceof File) {
        formData.append("coverImage", coverImage);
      } else if (coverImage === null) {
        formData.append("coverImage", "");
      }

      // ===============================
      // 3. Handle gallery images (multiple files)
      // ===============================
      galleryImages.forEach((item) => {
        if (item.imageUrl instanceof File) {
          formData.append("galleryImages", item.imageUrl);
        }
      });

      // ===============================
      // 4. Debug (safe logging)
      // ===============================
      console.log("FORMDATA ENTRIES:");
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const dataObj = JSON.parse(formData.get("data") as string);

      console.log("fullDescription:", dataObj.fullDescription);

      return;

      // ===============================
      // 5. API request
      // ===============================
      const response = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      // ===============================
      // 6. Error handling
      // ===============================
      if (response.status === 409) {
        toast.error(result?.error ?? "Duplicate value found.");
        return;
      }

      if (!response.ok) {
        toast.error(
          result?.error ??
            (isEditing
              ? "Project can't be updated. Please try again."
              : "Project can't be created. Please try again."),
        );
        return;
      }

      // ===============================
      // 7. Success
      // ===============================
      toast.success(
        result?.message ??
          (isEditing
            ? "Project updated successfully."
            : "Project created successfully."),
      );

      // Optional reset
      if (!isEditing) {
        // form.reset();
      }
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      toast.dismiss("project-create");
    }
  }

  function handleRemoveGalleryImage(index: number) {
    const image = watch(`galleryImages.${index}`);

    if (image?.fileId) {
      setDeletedGalleryImages((prev) => [...prev, image.fileId!]);
    }

    remove(index);
  }

  const options = technologies?.map((tech) => ({
    value: String(tech.id),
    label: tech.name,
  }));

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card w-full shadow flex flex-col gap-5 items-center rounded-2xl mt-10 p-10"
    >
      <div className="grid grid-cols-2 w-full gap-5">
        {/* TITLE */}
        <div className="flex flex-col gap-5 w-full">
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

                  <Select
                    key={field.value}
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
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

        {/* Technology Stack */}
        <div className="flex flex-col gap-5 w-full">
          <label className="uppercase text-left">Technologies</label>

          <Controller
            name="technologies"
            control={form.control}
            render={({ field, fieldState }) => {
              // Convert [{ id: number }] -> string[]
              const valueAsStrings =
                field.value?.map((t: { id: number }) => String(t.id)) || [];

              return (
                <Field>
                  <div className="relative w-full">
                    <Cpu className="absolute size-5 -translate-y-1/2 top-1/2 left-4 text-black/50 hidden sm:block pointer-events-none" />

                    <MultiSelect
                      options={options}
                      value={valueAsStrings}
                      placeholder="Choose Technologies..."
                      defaultValue={valueAsStrings}
                      className="text-black text-base! border border-black/25 min-h-15 pl-12 pr-7 w-full overflow-hidden"
                      // Convert string[] -> [{ id: number }]
                      onValueChange={(values: string[]) => {
                        const mapped = values.map((v) => ({ id: Number(v) }));
                        field.onChange(mapped);
                      }}
                    />
                  </div>

                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              );
            }}
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
            name="shortSummary"
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
            name="fullDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <RichTextEditor
                  key={field.name}
                  className="w-full rounded-lg border border-black/25"
                  placeholder="Write long description here"
                  value={field.value ?? ""}
                  onChange={(value) => field.onChange(value)}
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
            name="coverImage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                {!mainImagePreview ? (
                  <div className="relative w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          field.onChange(file);
                          setMainImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="text-black text-base border border-black/25 py-7 pl-12 pr-7 w-full"
                    />

                    <ImageIcon className="absolute size-5 top-1/2 left-7 -translate-y-1/2 text-black/75 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative max-w-full aspect-video rounded-lg border border-black/25 overflow-hidden">
                    <Image
                      src={mainImagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    {/* change/remove image button */}
                    <Button
                      type="button"
                      onClick={() => {
                        setMainImagePreview(null);
                        field.onChange(undefined);
                      }}
                      className="absolute top-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded"
                    >
                      Change
                    </Button>
                  </div>
                )}

                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </Field>
            )}
          />
        </div>

        {/* Other Images */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center justify-between">
            <label className="uppercase">Other Images</label>

            <button
              type="button"
              className="bg-black text-white px-4 py-2 text-sm"
              onClick={() =>
                append({
                  imageUrl: null,
                  fileId: null,
                })
              }
            >
              Add Image
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fields.map((item, index) => {
              const file = watch(`galleryImages.${index}.imageUrl`);

              const preview =
                file instanceof File
                  ? URL.createObjectURL(file)
                  : typeof file === "string"
                    ? file
                    : null;

              return (
                <div
                  key={item.id}
                  className="relative border border-black/20 rounded-lg overflow-hidden"
                >
                  {/* INPUT */}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setValue(`galleryImages.${index}.imageUrl`, file, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  />

                  {/* PREVIEW OR EMPTY STATE */}
                  {preview ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={preview}
                        alt="project image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center aspect-video text-sm text-black/50">
                      Click to upload
                    </div>
                  )}

                  {/* REMOVE BUTTON */}
                  <Button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-sm size-8 z-20"
                  >
                    ✕
                  </Button>
                </div>
              );
            })}
          </div>
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
                    value={field.value ?? ""}
                    onChange={(v) =>
                      field.onChange(
                        v.target.value === "" ? null : v.target.value,
                      )
                    }
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
                    value={field.value ?? ""}
                    onChange={(v) =>
                      field.onChange(
                        v.target.value === "" ? null : v.target.value,
                      )
                    }
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
            {data?.id ? "Updating..." : "Creating..."}
          </span>
        ) : (
          <span>{data?.id ? "Update Project" : "Create Project"}</span>
        )}
      </Button>
    </form>
  );
};

export default ProjectForm;
