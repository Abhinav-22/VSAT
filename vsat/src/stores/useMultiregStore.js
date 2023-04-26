import { create } from "zustand";

const useMultiregStore = create((set) => ({
  multiregflag: null,
  updateregFlag: () => set((state) => ({ multiregflag: 1 })),
  resetregFlag: () => set({ multiregflag: 0 }),
}));

export default useMultiregStore;
