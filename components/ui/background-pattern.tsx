import React from "react";

interface BackgroundPatternProps {
  opacity?: number;
  gridSize?: number;
  variant?: "light" | "dark";
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  opacity = 0.05,
  gridSize = 80,
  variant = "light",
}) => {
  const color = variant === "light" ? "#000" : "#fff";
  const backgroundStyle = {
    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    backgroundSize: `${gridSize}px ${gridSize}px`,
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <div className="w-full h-full" style={backgroundStyle} />
    </div>
  );
};
