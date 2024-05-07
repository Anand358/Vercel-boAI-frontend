import { create } from "zustand";

interface State {
  length: string;
  industry: string;
  platform: string;
}

interface Actions {
  setLength: (length: string) => void;
  setIndustry: (industry: string) => void;
  setPlatform: (platform: string) => void;
  resetStageOne: () => void;
}

const initialState = {
  length: "",
  industry: "",
  platform: "",
};

export const useStageOne = create<State & Actions>((set) => ({
  ...initialState,
  setLength: (length: string) => set({ length }),
  setIndustry: (industry: string) => set({ industry }),
  setPlatform: (platform: string) => set({ platform }),
  resetStageOne: () => set(initialState),
}));
