"use client";

import { formatDateWithSuffix } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type TotalContributions = {
  lastYear: number;
};

// Color mapping for intensity
const getContributionColor = (level: number): string => {
  const colors = [
    "#161b22", // 0 - empty
    "#0e4429", // 1
    "#006d32", // 2
    "#26a641", // 3
    "#39d353", // 4 - highest
  ];

  return colors[level] ?? colors[0];
};

/* -----------------------------
   Group days into week columns
   Each column = 1 week (7 days)
------------------------------*/
const buildWeeklyGrid = (days: ContributionDay[]): ContributionDay[][] => {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day, index) => {
    const date = new Date(day.date);

    // Convert JS day (Sun=0) → GitHub style (Mon start alignment)
    const weekDayIndex = (date.getDay() + 6) % 7;

    // Add empty placeholders for first week alignment
    if (index === 0 && weekDayIndex !== 0) {
      for (let i = 0; i < weekDayIndex; i++) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
    }

    currentWeek.push(day);

    // End of week (Sunday)
    if (weekDayIndex === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length) weeks.push(currentWeek);

  return weeks;
};

/* -----------------------------
   Extract month labels per column
   Only show first occurrence of a month
------------------------------*/
const extractMonthLabels = (weeks: ContributionDay[][]): string[] => {
  const seenMonths = new Set<string>();

  return weeks.map((week) => {
    const firstValidDay = week.find((d) => d.date);
    if (!firstValidDay) return "";

    const month = new Date(firstValidDay.date).toLocaleString("default", {
      month: "short",
    });

    if (seenMonths.has(month)) return "";

    seenMonths.add(month);
    return month;
  });
};

const GithubContributionsStats: React.FC<{ username?: string }> = ({
  username = "shahzaib-awann",
}) => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] =
    useState<TotalContributions>({ lastYear: 0 });
  const [isLoading, setIsLoading] = useState(true);

  /* Fetch GitHub contribution data */
  useEffect(() => {
    const fetchContributionData = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        );

        const data = await response.json();

        if (!data?.contributions) {
          throw new Error(
            "Invalid API response format from github contributions api",
          );
        }

        setContributions(data.contributions);
        setTotalContributions(data.total);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributionData();
  }, [username]);

  /* Derived data */
  const weeklyGrid = useMemo(
    () => buildWeeklyGrid(contributions),
    [contributions],
  );

  const monthLabels = useMemo(
    () => extractMonthLabels(weeklyGrid),
    [weeklyGrid],
  );

  return (
    <div className="bg-black text-white w-full py-30 flex justify-center">
      <div className="w-full max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            GitHub Contributions
          </h2>
          <p className="text-white/75 mt-4">
            A structured overview of my recent coding activity and contributions
            to open-source projects.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl shadow p-10">
          {/* Top bar */}
          <div className="relative flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-medium text-white tracking-widest uppercase">
                Activity Heatmap
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Last 12 months overview
              </p>
            </div>

            <p className="group relative inline-block">
              <Link
                href={`https://github.com/${username}`}
                className="text-white/75 hover:text-white flex flex-row gap-1 items-center text-sm"
              >
                View GitHub
                <ArrowUpRight className="size-4 transition-transform duration-500  group-hover:rotate-45 translate-x-1" />
              </Link>

              {/* Animated underline */}
              <span className="absolute left-0 -bottom-2 h-0.5 w-full bg-white transform scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </p>
          </div>

          {/* Chart Layout */}
          <div className="flex w-full relative">
            {isLoading ? (
              <div className="w-full max-w-[calc(100vw-150px)] overflow-hidden">
                <div className="grid grid-flow-col grid-rows-[repeat(7,14px)] auto-cols-[14px] gap-1 animate-pulse opacity-40">
                  {Array.from({ length: 365 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-white/10 rounded-xs" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Y Axis */}
                <div className="grid grid-rows-[repeat(7,14px)] gap-[3.5px] mr-1.5 text-xs text-white shrink-0">
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                  <span>Sun</span>
                </div>

                {/* Scrollable Content */}
                <div className="flex flex-col w-full max-w-[calc(100vw-180px)] overflow-x-auto dark-scrollbar scroll-smooth">
                  {/* Heatmap Grid */}
                  <div className="grid grid-flow-col grid-rows-[repeat(7,14px)] auto-cols-[14px] gap-1">
                    {weeklyGrid.flat().map((day, index) => (
                      <div
                        key={index}
                        title={
                          day.date
                            ? `${formatDateWithSuffix(day.date)} • ${day.count} contributions`
                            : ""
                        }
                        className="size-3 rounded-xs transition hover:scale-110 hover:z-10"
                        style={{
                          backgroundColor: getContributionColor(day.level),
                        }}
                      />
                    ))}
                  </div>

                  {/* X Axis */}
                  <div
                    className="grid mt-1 text-xs text-white gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${weeklyGrid.length}, 14px)`,
                    }}
                  >
                    {monthLabels.map((month, i) => (
                      <div key={i} className="text-center">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Stats */}
          <div className="relative mt-10 flex flex-col md:flex-row gap-2 justify-between text-sm text-white border-t border-white/20 pt-5">
            {/* Total Contributions */}
            <span>
              {totalContributions?.lastYear > 0
                ? `Total: ${totalContributions.lastYear} contributions`
                : "Total: Not available"}
            </span>

            {/* Peak Contributions */}
            <span>
              Peak:{" "}
              {weeklyGrid?.length
                ? Math.max(...weeklyGrid.flat().map((d) => d?.count || 0))
                : 0}
            </span>

            {/* Consistency */}
            <span>
              {totalContributions?.lastYear > 0
                ? "Consistency: High"
                : "Consistency: N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubContributionsStats;
