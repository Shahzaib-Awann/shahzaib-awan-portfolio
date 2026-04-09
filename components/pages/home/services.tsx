import { services } from "@/lib/portfolio.constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ServicesSection = () => {
    return (
        <section
            id="services"
            className="relative scroll-mt-10 py-25 bg-background overflow-hidden flex justify-center items-center"
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
                            className="bg-card hover:bg-card-hover group border border-black/10 hover:border-black/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-sm hover:-translate-y-1"
                        >
                            {/* Card content */}
                            <div className="relative p-10 pb-15 h-full space-y-15">

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