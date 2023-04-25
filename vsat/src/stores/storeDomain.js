import { create } from "zustand";

const useDomainStore = create((set) => ({
  domainval: "",
  updateDomain: (val) => set((state) => ({ domainval: val })),
  resetDomain: () => set({ domainval: null }),
}));

export default useDomainStore;
