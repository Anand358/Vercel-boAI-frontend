import { create } from "zustand";

interface State {
	briefs: { brief: string; title: string }[];
	selected: {
		index: number | null;
		briefText: string | null;
		title: string | null;
	};
}

interface Actions {
	setBriefs: (briefs: State["briefs"]) => void;
	setSelected: (selected: State["selected"]) => void;
	resetStageThree: () => void;
}

const initialState: State = {
	briefs: [],
	selected: { index: null, briefText: null, title: null },
};

export const useStageThree = create<State & Actions>((set) => ({
	...initialState,
	setBriefs: (briefs: State["briefs"]) => set({ briefs }),
	setSelected: (selected: State["selected"]) => set({ selected }),
	resetStageThree: () => set(initialState),
}));
