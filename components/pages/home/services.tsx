const ServicesSection = () => {

  return (
    <section id="services" className="relative min-h-screen flex flex-col items-center overflow-hidden bg-background py-20">
        
        {/* ShapeGrid Background (VERY subtle) */}
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

      <div className="container flex flex-col gap-10 px-5">

      </div>
    </section>
  );
};

export default ServicesSection;