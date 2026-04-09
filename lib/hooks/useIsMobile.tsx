import { useEffect, useState } from "react";

interface UseIsMobileResult {
  isMobile: boolean;
  width: number;
}

export function useIsMobile(breakpoint = 768): UseIsMobileResult {
  // Initialize state
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return { isMobile, width };
}