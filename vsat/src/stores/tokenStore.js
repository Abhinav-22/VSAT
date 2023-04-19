import { create } from "zustand";

const useTokenStore = create((set) => ({
  tokenVal: "",
  updateToken: (val) => set((state) => ({ tokenVal: val })),
  resetToken: () => set({ tokenVal: "" }),
}));

export default useTokenStore;
