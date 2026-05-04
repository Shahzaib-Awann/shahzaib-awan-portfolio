"use client";

import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  images: string[];
  startIndex?: number;
  open: boolean;
  onClose: () => void;
}

export default function ImageViewer({
  images,
  startIndex = 0,
  open,
  onClose,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(startIndex);

  // sync index
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // jump to start index
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(startIndex);
  }, [emblaApi, startIndex]);

  // keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [emblaApi, onClose]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* REQUIRED for accessibility */}
        <Dialog.Title className="sr-only">Image Viewer</Dialog.Title>

        {/* 🌑 BACKDROP (glass + blur) */}
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-50" />

        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-full transition"
          >
            <X size={18} />
          </button>

          {/* COUNTER */}
          <div className="absolute top-5 left-5 text-white/70 text-sm z-50">
            {current + 1} / {images.length}
          </div>

          {/* CAROUSEL */}
          <div className="w-full max-w-6xl overflow-hidden px-4" ref={emblaRef}>
            <div className="flex">
              {images.map((img, i) => (
                <div key={i} className="min-w-full flex justify-center">
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={img}
                      alt={`image-${i}`}
                      fill
                      className="object-contain scale-95 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAV */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition hover:scale-110"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition hover:scale-110"
          >
            <ChevronRight size={22} />
          </button>

          {/* THUMB STRIP */}
          <div className="absolute bottom-5 flex gap-5 overflow-x-auto overflow-y-hidden px-4 max-w-3xl">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`relative h-16 shrink-0 aspect-video rounded-md overflow-hidden border cursor-pointer transition ${
                  current === i
                    ? "border-white scale-110"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
