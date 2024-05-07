import { create } from "zustand";

interface State {
  stage: number | null;
  conversationId: string | null;
  screenplayId: string | null;
  lineupId: string | null;
}

interface Actions {
  setStage: (stage: number) => void;
  setConversationId: (id: string) => void;
  setScreenplayId: (id: string) => void;
  setLineupId: (id: string) => void;
}

const initialState: State = {
  stage: null,
  conversationId: null,
  screenplayId: null,
  lineupId: null,
};

export const useGlobalStore = create<State & Actions>((set) => ({
  ...initialState,
  setStage: (stage: number) => set({ stage }),
  setConversationId: (conversationId: string) => set({ conversationId }),
  setScreenplayId: (screenplayId: string) => set({ screenplayId }),
  setLineupId: (lineupId: string) => set({ lineupId }),
}));
