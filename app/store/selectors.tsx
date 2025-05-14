export const selectTestMode = (state: { settings: { settings: boolean } }) =>
  state.settings.settings;

export const selectOctaves = (state: { settings: { octaves: any } }) =>
  state.settings.octaves;

export const selectNotes = (state: { settings: { notes: any } }) =>
  state.settings.notes;

export const selectDifficulty = (state: { settings: { difficulty: any } }) =>
  state.settings.difficulty;

export const selectSemitones = (state: { settings: { semitones: any } }) =>
  state.settings.semitones;

export const selectDelay = (state: { settings: { delay: any } }) =>
  state.settings.delay;

export const selectSequence = (state: { settings: { maxSequence: any } }) =>
  state.settings.maxSequence;

export const selectScale = (state: { settings: { scale: any } }) =>
  state.settings.scale;
