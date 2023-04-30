import { create } from "zustand";

const usePortListStore = create((set) => ({
  openports: "loading...",
  updateOpenPorts: (len) => set((state) => ({ openports: len })),
  resetPorts: () => set({ openports: 0 }),
}));

export default usePortListStore;
