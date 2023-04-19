import { create } from "zustand";

const usePortStore = create((set) => ({
  scanports: "loading...",
  updatePorts: (len) => set((state) => ({ scanports: len })),
  resetPorts: () => set({ scanports: 0 }),
}));

export default usePortStore;
