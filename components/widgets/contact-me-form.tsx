"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail, Type, User } from "lucide-react";
import Link from "next/link";
import { contactInfo, socialLinks } from "@/lib/portfolio.constants";
import toast from "react-hot-toast";
import { contactMeFormSchema } from "@/lib/zod/schema";
import { Field } from "../ui/field";

export function ContactMeForm() {
  // Initialize zod form with validation schema
  const form = useForm<z.infer<typeof contactMeFormSchema>>({
    resolver: zodResolver(contactMeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Submit Handler
  function onSubmit(data: z.infer<typeof contactMeFormSchema>) {
    console.warn(data);
    toast.success("Form Submitted");
  }

  // Copy email to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Email Copied");
  };

  return (
    <div className="text-white grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Contact Form */}
      <form
        className="col-span-1 lg:col-span-2 bg-white/10 rounded-2xl p-10 space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Name & Email Row */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Name Input Field */}
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="full-name-input-field" className="uppercase">
              Full Name
            </label>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="relative">
                    <Input
                      {...field}
                      type="text"
                      variant="simple"
                      className="text-white border border-white/25 py-7 px-12"
                      placeholder="Your Name"
                      id="full-name-input-field"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    <User className="absolute size-5 -translate-1/2 top-1/2 left-7 text-white/75 " />
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

          {/* Email Input Field */}
          <div className="flex flex-col gap-5 w-full">
            <label htmlFor="email-input-field" className="uppercase">
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
                      className="text-white border border-white/25 py-7 px-12"
                      placeholder="your@mail.com"
                      id="email-input-field"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <Mail className="absolute size-5 -translate-1/2 top-1/2 left-7 text-white/75 " />
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
        </div>

        {/* Subject Input Field */}
        <div className="flex flex-col gap-5 w-full">
          <label htmlFor="subject-input-field" className="uppercase">
            Subject
          </label>
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="relative">
                  <Input
                    {...field}
                    type="text"
                    variant="simple"
                    className="text-white border border-white/25 py-7 px-12"
                    placeholder="Write a subject"
                    id="subject-input-field"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  <Type className="absolute size-5 -translate-1/2 top-1/2 left-7 text-white/75 " />
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

        {/* Message Input Field */}
        <div className="flex flex-col gap-5 w-full">
          <label htmlFor="message-input-field" className="uppercase">
            Message
          </label>
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <textarea
                  {...field}
                  className="text-white w-full h-full max-h-100 min-h-45 border border-white/25 p-5 rounded-lg ring-0 outline-0"
                  placeholder="Write a Message"
                  id="message-input-field"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
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
        <Button className="bg-black text-white hover:bg-background hover:text-black border hover:border-black px-10 py-8 text-sm rounded-none transition-all duration-300">
          Send Message
        </Button>
      </form>

      {/* Contact Info & Social Links */}
      <div className="col-span-1  grid md:grid-cols-2 lg:grid-cols-1 gap-7 lg:gap-8 items-stretch">
        {/* Contact Info Cards */}
        {contactInfo.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              onClick={() => item.canCopy && handleCopy(item.value)}
              className={`group flex-col items-start xl:flex-row flex xl:items-center gap-5 rounded-2xl border border-black/10 bg-white/10 p-6 transition-all duration-500 hover:border-black/40 hover:-translate-y-1 
                ${item.canCopy ? "cursor-copy" : ""}`}
            >
              <Icon className="size-5 text-white transition-all duration-500 group-hover:rotate-360" />
              <div>
                <h3 className="text-lg uppercase font-semibold text-white group-hover:translate-x-2 transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-white/50">{item.value}</p>
              </div>
              <div className="ml-auto h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-12" />
            </div>
          );
        })}

        {/* Social Links */}
        <div className="group rounded-2xl border border-black/10 bg-white/10 p-6 transition-all duration-500 hover:border-black/40 hover:-translate-y-1">
          <h3 className="text-lg font-semibold uppercase text-white">
            Social Links
          </h3>
          <div className="flex flex-wrap gap-4 mt-5">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="p-3 rounded border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Icon className="size-5 text-white" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}