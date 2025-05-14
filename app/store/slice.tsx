import { DIFFICULTIES, Difficulty } from "@/constants/Difficulties";
import { Notes } from "@/constants/Notes";
import { Octaves } from "@/constants/Octaves";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: false,
  octaves: Object.keys(Octaves)
    .filter((item) => isNaN(+item))
    .map((octave) => ({ octave, value: true })),
  notes: Object.keys(Notes)
    .filter((item) => isNaN(+item))
    .map((note) => ({
      note,
      value: true,
    })),
  difficulty: Difficulty.Easy,
  semitones: 3,
  delay: 500,
  maxSequence: 2,
  scale: "CHROMATIC",
}

const reducers = {
  toggle: (state) => {
    state.settings = !state.settings;
  },
  toggleOctave: (state, value) => {
    state.octaves = state.octaves.map((item) =>
      item.octave === value.payload.octave
        ? { ...value.payload, value: !item.value }
        : { ...item }
    );
  },
  toggleNote: (state, value) => {
    state.notes = state.notes.map((item) =>
      item.note === value.payload.note
        ? { ...value.payload, value: !item.value }
        : { ...item }
    );
  },
  setDifficulty: (state, value) => {
    state.difficulty = value.payload;
    if (value.payload === Difficulty.Easy) {
      state.maxSequence = DIFFICULTIES.EASY.maxSequence;
      state.delay = DIFFICULTIES.EASY.delay;
      state.semitones = DIFFICULTIES.EASY.semitones;
    } else if (value.payload === Difficulty.Moderate) {
      state.maxSequence = DIFFICULTIES.MODERATE.maxSequence;
      state.delay = DIFFICULTIES.MODERATE.delay;
      state.semitones = DIFFICULTIES.MODERATE.semitones;
    } else if (value.payload === Difficulty.Difficult) {
      state.maxSequence = DIFFICULTIES.DIFFICULT.maxSequence;
      state.delay = DIFFICULTIES.DIFFICULT.delay;
      state.semitones = DIFFICULTIES.DIFFICULT.semitones;
    }
  },
  setSemitones: (state, value) => {
    state.semitones = value.payload[0];
  },
  setDelay: (state, value) => {
    state.delay = value.payload[0];
  },
  setScale: (state, value) => {
    state.scale = value.payload.scale;
    state.notes = Object.entries(value.payload.notes).map(
      ([note, value]) => ({ note, value })
    );
  },
  setSequence: (state, value) => {
    state.maxSequence = value.payload[0];
  }
}

export const configSlice = createSlice({
  name: "settings",
  initialState,
  reducers
});

export const {
  toggle,
  toggleOctave,
  toggleNote,
  setDifficulty,
  setSemitones,
  setDelay,
  setSequence,
  setScale,
} = configSlice.actions;

export default configSlice.reducer;
