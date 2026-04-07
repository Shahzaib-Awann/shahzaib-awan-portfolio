
import { ContactMeForm } from "@/components/widgets/contact-me-form";
import Link from "next/link";

const ContactMeSection = () => {
  return (
    <section
      id="contact-me"
      className="relative flex flex-col items-center overflow-hidden bg-black py-25"
    >
      {/* Main Section */}
      <div className="container flex flex-col gap-10 px-5">
        {/* Header section (title + description) */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
          {/* Left side (heading + subheading) */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="#contact-me"
              className="text-white md:text-white  text-3xl sm:text-4xl md:text-6xl uppercase font-semibold tracking-tight transition-all duration-300"
            >
              Contact Me
            </Link>

            <p className="mt-4 text-lg lg:text-xl text-white/75">
              Start a conversation
            </p>
          </div>

          {/* Right side description */}
          <p className="text-white/75 text-center max-w-md md:text-right leading-relaxed">
            Whether you have a clear vision or just an idea, I&apos;m here to
            help shape it into something meaningful and impactful.
          </p>
        </div>

        {/* Contact Me Form */}
        <ContactMeForm />
      </div>
    </section>
  );
};

export default ContactMeSection;
