"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  selectedTech: { id: number; name: string } | null;
};

const DeleteTechnologyDialog = ({ open, setOpen, selectedTech }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedTech?.id) return;

    try {
      setIsLoading(true);
      toast.loading("Deleting technology...", { id: "delete-tech" });

      const res = await fetch("/api/technologies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedTech.id }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Failed to delete");
        return;
      }

      toast.success(result?.message || "Deleted successfully");

      router.refresh();

      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      toast.dismiss("delete-tech");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg bg-card w-full p-10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Delete Technology
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedTech?.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="w-fit px-10 py-8 text-sm rounded-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="bg-red-500/75 w-fit text-red-600 hover:bg-red-500 hover:text-red-500 px-10 py-8 text-sm rounded-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTechnologyDialog;
