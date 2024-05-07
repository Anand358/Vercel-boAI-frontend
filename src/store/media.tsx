import { create } from "zustand";

interface State {
  media: string[] | null;
}

interface Actions {
  setMedia: (media: State["media"]) => void;
  resetMedia: () => void;
}

const initialState: State = {
  media: null,
};

export const useMedia = create<State & Actions>((set) => ({
  ...initialState,
  setMedia: (media: State["media"]) => set({ media }),
  resetMedia: () => set(initialState),
}));
