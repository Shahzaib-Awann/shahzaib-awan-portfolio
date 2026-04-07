import { testimonials } from "@/lib/portfolio.constants";
import { Star } from "lucide-react";
import Link from "next/link";

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative py-25 bg-background overflow-hidden flex justify-center items-center"
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
              href="#testimonials"
              className="text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight text-foreground  transition-all duration-300"
            >
              Testimonials
            </Link>

            <p className="mt-4 text-lg lg:text-xl text-muted-foreground">
            Real feedback on real work
            </p>
          </div>

          {/* Right side description */}
          <p className="text-muted-foreground text-center max-w-md md:text-right leading-relaxed">
          Experiences shared by those who have worked with me on developing
          performant systems, clean architectures, and production-ready solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-background transition-all duration-500 hover:border-black/40 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Content */}
              <div className="relative p-10 flex flex-col justify-between h-full bg-white/25">
                {/* Top Row */}
                <div className="flex items-start justify-end">
                  {/* Quote */}
                  <span className="absolute top-8 left-10 font-serif text-black/20 text-7xl leading-none select-none">
                    “
                  </span>

                  {/* Stars */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 text-yellow-500 fill-yellow-500 transition-transform duration-300 group-hover:scale-110"
                      />
                    ))}
                  </div>
                </div>

                {/* Review */}
                <p className="text-muted-foreground mt-15 text-base leading-relaxed">
                  {item.review}
                </p>

                {/* Bottom */}
                <div className="mt-10 flex items-center justify-between">
                  {/* Name */}
                  <h3 className="text-2xl sm:text-3xl md:text-2xl font-semibold tracking-tight text-foreground">
                    {item.name}
                  </h3>

                  {/* Line accent */}
                  <div className="h-px w-10 bg-black/30 transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
