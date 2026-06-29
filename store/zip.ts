"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ZipState {
  validatedZip: string | null;
  setValidatedZip: (zip: string) => void;
  clearZip: () => void;
}

export const useZipStore = create<ZipState>()(
  persist(
    (set) => ({
      validatedZip: null,
      setValidatedZip: (zip) => set({ validatedZip: zip }),
      clearZip: () => set({ validatedZip: null }),
    }),
    { name: "radha-zip" }
  )
);

// ── Non-persisted UI state for the zip modal ──────────────────────────────────
interface ZipModalState {
  isOpen: boolean;
  pendingCallback: (() => void) | null;
  open: (callback?: () => void) => void;
  close: () => void;
}

export const useZipModalStore = create<ZipModalState>()((set) => ({
  isOpen: false,
  pendingCallback: null,
  open:  (cb) => set({ isOpen: true,  pendingCallback: cb ?? null }),
  close: ()   => set({ isOpen: false, pendingCallback: null }),
}));
