import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TmpLayout = () => {
  return (
    <section
            id="services"
            className="relative min-h-screen py-20 bg-background overflow-hidden flex justify-center items-center"
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            {/* Main container */}
            <div className="container mx-auto px-6 relative z-10 space-y-20">

                {/* Header section (title + description) */}
                <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">

                    {/* Left side (heading + subheading) */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link
                            href="#servi"
                            className="text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight text-foreground  transition-all duration-300"
                        >
                            Temp
                        </Link>

                        <p className="mt-4 text-lg lg:text-xl text-muted-foreground">
                            Simple ideas, powerful execution
                        </p>
                    </div>

                    {/* Right side description */}
                    <p className="text-muted-foreground text-center max-w-md md:text-right leading-relaxed">
                        Turning ideas into scalable, high-performance digital experiences
                        with precision and purpose.
                    </p>
                </div>

                {/* Smaller Services grid */}
<div className="max-w-6xl mx-auto p-4">
  <div className="grid grid-cols-3 gap-4">
    {/* Row 1 */}
    <div className="col-span-2 aspect-video border border-black">
      Video
    </div>
    <div className="border border-black h-full">
      Square
    </div>

    {/* Row 2 */}
    <div className="border border-black h-full">
      Square
    </div>
    <div className="col-span-2 aspect-video border border-black">
      Video
    </div>
  </div>
</div>

            </div>
        </section>
  )
}

export default TmpLayout