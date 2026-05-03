"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectGallery({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  const handleThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className={cn("w-full mx-auto relative", className)}>
      {/* MAIN IMAGE CAROUSEL */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="relative aspect-video p-0">
                  <Image
                    src={src}
                    alt="image"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="eager"
                    className="object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
          <Button
            onClick={() => api?.scrollPrev()}
            type="button"
            className="pointer-events-auto size-10 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md rounded-full p-3 transition hover:scale-110"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            onClick={() => api?.scrollNext()}
            type="button"
            className="pointer-events-auto size-10 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md rounded-full p-3 transition hover:scale-110"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </Carousel>

      {/* THUMBNAILS */}
      <div className="mt-0">
        <Carousel>
          <CarouselContent className="flex gap-2 px-7">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 p-1"
                onClick={() => handleThumbClick(index)}
              >
                <Card
                  className={cn(
                    "overflow-hidden rounded md:rounded-md bg-transparent p-0 transition-all duration-200",
                    current === index
                      ? "border border-white/50"
                      : "border-none",
                  )}
                >
                  <CardContent
                    className={cn(
                      "relative w-full aspect-video p-0",
                      current !== index && "opacity-50 cursor-pointer",
                    )}
                  >
                    <Image
                      src={src}
                      alt="thumb"
                      fill
                      sizes="100px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
