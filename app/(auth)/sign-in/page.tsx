import SignInForm from "@/components/pages/sign-in/sign-in-form";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div
      id="sign-in"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-10"
    >
      {/* Background */}
      <BackgroundPattern />

      {/* Content */}
      <div className="container  mx-auto px-6 relative z-10 flex flex-col items-center gap-10 text-center">
        <Link
          href="#sign-in"
          className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight transition-all duration-300 text-foreground"
        >
          Sign in
        </Link>

        <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl">
        You won’t always feel ready. Build anyway — readiness comes from repetition.
        </p>

        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;