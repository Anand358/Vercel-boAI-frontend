import { create } from "zustand";

interface State {
  resolution: string;
  length: string;
  pacing: string;
  shots: { [key: string]: number | string }[];
  files: File[];
  images: string[];
}

interface Actions {
  setResolution: (resolution: string) => void;
  setLen: (length: string) => void;
  setPacing: (pacing: string) => void;
  setShots: (shots: State["shots"]) => void;
  setFiles: (files: File[]) => void;
  setImages: (images: string[]) => void;
  resetStageFour: () => void;
}

const initialState: State = {
  resolution: "",
  length: "",
  pacing: "",
  shots: [],
  files: [],
  images: [],
};

export const useStageFour = create<State & Actions>((set) => ({
  ...initialState,
  setResolution: (resolution: string) => set({ resolution }),
  setLen: (length: string) => set({ length }),
  setPacing: (pacing: string) => set({ pacing }),
  setShots: (shots: State["shots"]) => set({ shots }),
  setFiles: (files: File[]) => set({ files }),
  setImages: (images: string[]) => set({ images }),
  resetStageFour: () => set(initialState),
}));
