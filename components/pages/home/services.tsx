"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Services data (kept separate for scalability and clarity)
const services = [
    {
        id: "01",
        title: "Web App Development",
        desc: "Building modern, scalable web applications with Next.js, focused on performance, reliability, and seamless user experience.",
    },
    {
        id: "02",
        title: "Mobile App Development",
        desc: "Creating intuitive and high-performing mobile applications designed for smooth interaction and consistent user experience.",
    },
    {
        id: "03",
        title: "Desktop Software Solutions",
        desc: "Developing efficient desktop applications tailored for speed, usability, and real-world productivity.",
    },
    {
        id: "04",
        title: "AI Systems & Automation",
        desc: "Enhancing applications with intelligent capabilities that automate workflows and deliver smarter user interactions.",
    },
];

const ServicesSection = () => {
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
                            href="#services"
                            className="text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight text-foreground  transition-all duration-300"
                        >
                            Services
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

                {/* Services grid */}
                <div className="grid md:grid-cols-2 gap-8">

                    {services.map((service) => (
                        <div
                            key={service.id} // better key usage
                            className="bg-background group border border-black/10 hover:border-black/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-sm"
                        >
                            {/* Card content */}
                            <div className="relative p-10 pb-15 h-full space-y-15 bg-white/25">

                                {/* Hover overlay effect */}
                                <div className="absolute inset-0 h-full bg-white/25 opacity-0 group-hover:opacity-100 transition duration-300" />

                                {/* Top row (ID + icon) */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        {service.id}
                                    </span>

                                    <ArrowUpRight className="size-6 text-muted-foreground transition-all duration-500 group-hover:rotate-45 translate-x-1" />
                                </div>

                                {/* Title + description */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-semibold mt-6 text-foreground transition-all duration-300 group-hover:translate-x-2">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ServicesSection;