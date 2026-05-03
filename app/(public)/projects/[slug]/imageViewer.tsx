"use client";

import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

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

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(startIndex);
  }, [emblaApi, startIndex]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/90 z-50" />

        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50"
          >
            <X />
          </button>

          {/* SLIDER */}
          <div className="w-full max-w-6xl overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((img, i) => (
                <div key={i} className="min-w-full flex justify-center">
                  <div className="relative w-full h-[80vh]">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAV */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-6 text-white/60 hover:text-white"
          >
            <ChevronLeft size={40} />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-6 text-white/60 hover:text-white"
          >
            <ChevronRight size={40} />
          </button>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}