import { create } from "zustand";

interface State {
  concepts: { [key: string]: number | string | object[] }[] | null;
}

interface Actions {
  setConcepts: (concepts: State["concepts"]) => void;
  resetConcepts: () => void;
}

const initialState: State = {
  concepts: null,
};

export const useConcepts = create<State & Actions>((set) => ({
  ...initialState,
  setConcepts: (concepts: State["concepts"]) => set({ concepts }),
  resetConcepts: () => set(initialState),
}));
