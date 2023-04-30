import { create } from "zustand";

const useGlanceStore = create((set) => ({
  domainstatus: "loading...",
  sslstatus: "loading...",
  phishtankstatus: "loading...",
  HSTSstatus: "loading...",
  databreachstatus: "loading...",
  updateDomainstatus: (len) => set((state) => ({ domainstatus: len })),
  updateSSLstatus: (len) => set((state) => ({ sslstatus: len })),
  updatePhishstatus: (len) => set((state) => ({ phishtankstatus: len })),
  updateHSTSstatus: (len) => set((state) => ({ HSTSstatus: len })),
  updateBreachstatus: (len) => set((state) => ({ databreachstatus: len })),
}));

export default useGlanceStore;
