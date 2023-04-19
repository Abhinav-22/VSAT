import { create } from "zustand";

const useTxtStore = create((set) => ({
  txtVal: "",
  updateTxt: (val) => set((state) => ({ txtVal: val })),
  resetTxt: () => set({ txtVal: "" }),
}));

export default useTxtStore;
