"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { BusinessLeadModalProvider } from "@/context/BusinessLeadModalContext";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1) Sayfa yenilendiğinde en başa sarması için (Scroll Restoration kapatma)
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

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
