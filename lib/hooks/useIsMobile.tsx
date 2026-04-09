"use client";
import { useEffect, useState } from "react";

interface UseIsMobileResult {
  isMobile: boolean;
  width: number;
}

/**
 * === useIsMobile Hook ===
 *
 * Tracks the current window width and determines if the viewport is considered "mobile"
 * based on a given breakpoint.
 *
 * Fields:
 * - isMobile (boolean): True if window width is less than or equal to the breakpoint
 * - width (number): Current window width in pixels
 *
 * @param {number} [breakpoint=768] - The pixel width threshold to consider "mobile"
 * @returns {UseIsMobileResult} - Object containing `isMobile` and `width`
 *
 * Example usage:
 * ```ts
 * const { isMobile, width } = useIsMobile(1024);
 * if (isMobile) console.log("Show mobile layout");
 * ```
 */
export function useIsMobile(breakpoint = 768): UseIsMobileResult {
  // === (server-side safe) ===

  // Initialize state
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  // Initialize mobile check state
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setIsMobile(currentWidth <= breakpoint);
    };

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Initial check in case the hook runs after mount
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { isMobile, width };
}