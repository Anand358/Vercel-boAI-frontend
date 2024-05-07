import { create } from "zustand";

interface State {
  videoBlob: Blob | null;
}

interface Actions {
  setVideoBlob: (videoBlob: State["videoBlob"]) => void;
  resetStageFive: () => void;
}

const initialState: State = {
  videoBlob: null,
};

export const useVideo = create<State & Actions>((set) => ({
  ...initialState,
  setVideoBlob: (videoBlob: State["videoBlob"]) => set({ videoBlob }),
  resetStageFive: () => set(initialState),
}));
