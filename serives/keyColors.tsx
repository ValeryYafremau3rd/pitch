const octave_step = Math.floor(255 / 6);
const note_step = Math.floor(255 / 12);

function toHex(x: number) {
  const hex = x.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export default function calcKeyColor(index = 0) {
  return {
    backgroundColor:
      "#" +
      toHex(octave_step * (index % 6)) +
      toHex(note_step * Math.floor(index / 6)) +
      toHex(note_step * Math.floor(index / 6)) +
      "FF",
  };
}
