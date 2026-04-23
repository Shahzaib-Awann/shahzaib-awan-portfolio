"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const SignInForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize zod form with validation schema
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* === Submit Handler === */
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      setIsLoading(true);
      toast.loading("Signing in...", {
        id: "sign-in-loading",
      });

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });
      
      // === Handle sign-in result ===
      if (result?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Welcome back!");
      window.location.href = callbackUrl || "/admin";

    } catch (e) {
      console.log("Error from sign-in page: ", e);
    } finally {
      setIsLoading(false);
      toast.dismiss("sign-in-loading");
    }
  }

  // === Toggle password visibility ===
  const togglePasswordVisibility = () => setPasswordIsVisible((prev) => !prev);

  return (
    <form
      className="bg-card max-w-2xl w-full shadow flex flex-col gap-4 md:gap-5 items-center rounded-2xl mt-10 p-10"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Email Input Field */}
      <div className="flex flex-col gap-5 w-full">
        <label htmlFor="sign-in-email-input-field" className="uppercase w-full text-left">
          Email
        </label>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative">
                <Input
                  {...field}
                  type="email"
                  variant="simple"
                  className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  placeholder="your@mail.com"
                  id="sign-in-email-input-field"
                  aria-invalid={fieldState.invalid}
                />
                <Mail className="absolute size-5 -translate-1/2 top-1/2 left-7 text-black/75 " />
              </div>
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-2">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
      </div>

      {/* Password Input Field */}
      <div className="flex flex-col gap-5 w-full">
        <label htmlFor="sign-in-password-input-field" className="uppercase w-full text-left">
          Password
        </label>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative">
                <Input
                  {...field}
                  type={passwordIsVisible ? "text" : "password"}
                  variant="simple"
                  className="text-black text-base! border border-black/25 py-7 pl-12 pr-7"
                  placeholder="• • • • • •"
                  id="sign-in-password-input-field"
                  aria-invalid={fieldState.invalid}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute -translate-1/2 top-1/2 left-7 text-black/75"
                  onClick={togglePasswordVisibility}
                >
                  {passwordIsVisible ? (
                    <EyeClosed className="size-5 text-black/75" />
                  ) : (
                    <Eye className="size-5 text-black/75" />
                  )}
                </Button>
              </div>
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-2">
                  {fieldState.error.message}
                </p>
              )}
            </Field>
          )}
        />
      </div>

      {/* Submit Button */}
      <Button
        disabled={isLoading}
        className="bg-black w-full text-white hover:bg-transparent hover:text-black border border-black px-10 py-8 text-sm rounded-none transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing In...
          </span>
        ) : (
          <span className="flex items-center gap-2">Sign In</span>
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
