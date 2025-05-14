import { selectNotes, selectOctaves } from "@/app/store/selectors";
import { keys } from "@/constants/Keys";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export function useKeys() {
  const octaves = useSelector(selectOctaves);
  const notes = useSelector(selectNotes);

  return useMemo(
    () =>
      keys.filter(
        (key) =>
          octaves &&
          octaves[+key.octave - 1].value &&
          notes &&
          notes.find((item) => item.note === key.note).value
      ),
    [octaves, notes]
  );
}
