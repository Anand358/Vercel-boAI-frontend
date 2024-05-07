import { create } from "zustand";

interface State {
  questions: { question: string; options?: string[]; other: boolean }[];
  answers: {
    [key: string]: string | undefined;
  }[];
}

interface Actions {
  setQuestions: (questions: State["questions"]) => void;
  setAnswers: (answers: State["answers"]) => void;
  resetStageTwo: () => void;
}

const initialState = {
  questions: [],
  answers: [],
};

export const useStageTwo = create<State & Actions>((set) => ({
  ...initialState,
  setQuestions: (questions: State["questions"]) => set({ questions }),
  setAnswers: (answers: State["answers"]) => set({ answers }),
  resetStageTwo: () => set(initialState),
}));
