"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { BusinessLeadModalProvider } from "@/context/BusinessLeadModalContext";

function scrollToHashOrTop() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  if (hash.length > 1) {
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
  }
  window.scrollTo(0, 0);
}

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    scrollToHashOrTop();
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHashOrTop();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <BusinessLeadModalProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex min-h-screen flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </BusinessLeadModalProvider>
  );
}
