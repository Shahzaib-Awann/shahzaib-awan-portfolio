"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Cpu, Loader2 } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { technologySchema } from "@/lib/zod/schema";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  defaultValues?: { id: number; name: string } | null;
  isEditing?: boolean;
};

const AddNewDialog = ({
  open,
  setOpen,
  defaultValues,
  isEditing = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof technologySchema>>({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      id: undefined,
      name: "",
    },
  });

  useEffect(() => {
    if (defaultValues && isEditing) {
      form.setValue("id", defaultValues.id);
      form.setValue("name", defaultValues.name);
    } else {
      form.reset({ name: "" });
    }
  }, [defaultValues, isEditing]);

  /* === Submit Handler === */
  async function onSubmit(values: z.infer<typeof technologySchema>) {
    const API_URL = "/api/technologies";

    try {
      setIsLoading(true);
      toast.loading("Adding technology...", { id: "add-tech" });

      const response = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      {
        /* === Show warning toast for duplicate/409 error === */
      }
      if (response.status === 409) {
        toast.error(result?.error ?? "Duplicate value found.");
        return;
      }

      if (!response.ok) {
        toast.error(
          result?.error ??
            (isEditing
              ? "Technology can't be updated. Please try again."
              : "Technology can't be created. Please try again."),
        );
        return;
      }

      toast.success(
        result?.message ??
          (isEditing
            ? "Technology updated successfully."
            : "New Technology added successfully."),
      );

      // Reset form only after successful create
      if (!isEditing) {
        form.reset();
      }

      router.refresh();

      setOpen(false);
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
      toast.dismiss("add-tech");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Dialog Content */}
      <DialogContent className="sm:max-w-xl bg-card p-10 w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Edit Technology" : "Add Technology"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the technology name"
              : "Enter a new technology"}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-4"
        >
          {/* Technology Name Field */}
          <div className="flex flex-col gap-2">
            <label className="uppercase text-sm">Technology Name</label>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="relative">
                    <Input
                      {...field}
                      type="text"
                      variant="simple"
                      className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                      placeholder="React.js, Next.js"
                      id="sign-in-email-input-field"
                      aria-invalid={fieldState.invalid}
                    />
                    <Cpu className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75 " />
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

          {/* Submit Button */}
          <Button
            disabled={isLoading}
            className="bg-black w-full text-white hover:bg-transparent hover:text-black border border-black px-10 py-8 text-sm rounded-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : isEditing ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDialog;
