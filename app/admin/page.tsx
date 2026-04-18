import React from "react";
import { FolderKanban, FileText, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const AdminPage = async () => {
  // === Get session ===
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  // === Time-based greeting ===
  const hour = new Date().getHours();
  const year = new Date().getFullYear();

  const getGreeting = () => {
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // === Dummy stats (replace with DB later) ===
  const stats = [
    {
      title: "Projects",
      count: 12,
      icon: FolderKanban,
    },
    {
      title: "Blogs",
      count: 5,
      icon: FileText,
    },
    {
      title: "Messages",
      count: 8,
      icon: Mail,
    },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 z-10">
      <div className="w-full max-w-6xl">

        {/* ===== HERO SECTION ===== */}
        <div className="text-center mb-16 space-y-6">

          {/* Animated Icon */}
          <div className="relative inline-block">

            <div className="relative bg-linear-to-br from-black to-gray-800 p-6 rounded-2xl shadow-xl">
              <FolderKanban className="size-12 sm:size-16 text-white" />
            </div>
          </div>

          {/* Greeting */}
          <div className="space-y-3 flex flex-col justify-center items-center">
            <p className="text-xs z-10 w-fit px-3 py-1 rounded-full bg-card shadow text-black">
              {getGreeting()}
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Welcome to{" "}
              <span className="text-black">
                Admin Panel
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Hello,{" "}
              <span className="font-semibold capitalize text-black">
                {user.name}
              </span>
            </p>

            <p className="text-muted-foreground max-w-xl mx-auto">
              Manage your portfolio content - projects, blogs, and messages - all in one place.
            </p>
          </div>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-card z-10 border rounded-xl p-6 flex items-center justify-between hover:shadow-md hover:bg-card-hover transition-all"
              >
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-bold mt-1">
                    {item.count}
                  </h2>
                </div>

                <Icon className="size-8 text-black/70" />
              </div>
            );
          })}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Logged in as{" "}
            <span className="capitalize font-medium">
              {user.role}
            </span>{" "}
            • Admin Dashboard v1.0
          </p>

          <p className="text-sm text-muted-foreground">
            &copy; {year} Shahzaib Awan Portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;