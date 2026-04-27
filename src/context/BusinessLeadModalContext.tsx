"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import BusinessLeadModal from "@/components/BusinessLeadModal";

type BusinessLeadModalContextValue = {
  openBusinessLeadModal: () => void;
  closeBusinessLeadModal: () => void;
};

const BusinessLeadModalContext = createContext<BusinessLeadModalContextValue | null>(null);

export function BusinessLeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBusinessLeadModal = useCallback(() => setOpen(true), []);
  const closeBusinessLeadModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openBusinessLeadModal, closeBusinessLeadModal }),
    [openBusinessLeadModal, closeBusinessLeadModal]
  );

  return (
    <BusinessLeadModalContext.Provider value={value}>
      {children}
      <BusinessLeadModal open={open} onClose={closeBusinessLeadModal} />
    </BusinessLeadModalContext.Provider>
  );
}

export function useBusinessLeadModal() {
  const ctx = useContext(BusinessLeadModalContext);
  if (!ctx) {
    throw new Error("useBusinessLeadModal BusinessLeadModalProvider içinde kullanılmalıdır.");
  }
  return ctx;
}
