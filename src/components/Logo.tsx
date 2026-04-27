"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
  floatingInHeader?: boolean;
}

const logoHeight = {
  xs: 80,
  sm: 100,
  md: 120,
  lg: 160,
};

export default function Logo({
  className = "",
  size = "md",
  showText: _showText = true,
  variant: _variant = "dark",
  floatingInHeader = false,
}: LogoProps) {
  const h = logoHeight[size];

  if (floatingInHeader) {
    return (
      <motion.div
        className={`relative shrink-0 overflow-visible bg-transparent ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src="/trinq-logo.png"
          alt="trinQ"
          style={{ height: h, width: "auto" }}
          className="object-contain"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`flex items-center bg-transparent ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src="/trinq-logo.png"
        alt="trinQ"
        style={{ height: h, width: "auto" }}
        className="object-contain"
      />
    </motion.div>
  );
}
