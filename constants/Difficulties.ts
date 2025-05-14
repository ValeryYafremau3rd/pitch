export const EASY = {
  semitones: 3,
  delay: 500,
  maxSequence: 2,
};

export const MODERATE = {
  semitones: 4,
  delay: 300,
  maxSequence: 4,
};

export const DIFFICULT = {
  semitones: 6,
  delay: 200,
  maxSequence: 5,
};

export const DIFFICULTIES = {
  EASY,
  MODERATE,
  DIFFICULT,
};

export const enum Difficulty {
  Easy = "Easy",
  Moderate = "Moderate",
  Difficult = "Difficult",
}
