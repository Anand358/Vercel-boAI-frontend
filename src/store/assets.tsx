import { create } from "zustand";

interface State {
  assets: object | null;
  selected: string[];
}

interface Actions {
  setAssets: (assets: State["assets"]) => void;
  setSelected: (selected: State["selected"]) => void;
  resetAssets: () => void;
}

const initialState: State = {
  assets: null,
  selected: [],
};

export const useAssets = create<State & Actions>((set) => ({
  ...initialState,
  setAssets: (assets: State["assets"]) => set({ assets }),
  setSelected: (selected: State["selected"]) => set({ selected }),
  resetAssets: () => set(initialState),
}));
