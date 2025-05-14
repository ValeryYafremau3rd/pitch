import {
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MonoText } from "@/components/MonoText";
import {
  selectOctaves,
  selectSemitones,
  selectDelay,
  selectNotes,
  selectTestMode,
} from "../../store/selectors";
import { useKeys } from "@/hooks/useKeys";

export default function IntervalScreen() {
  const octaves = useSelector(selectOctaves);
  const maxRange = useSelector(selectSemitones);
  const delay = useSelector(selectDelay);
  const notes = useSelector(selectNotes);
  const [nextDisabled, setNextDisabled] = useState(true);
  const testMode = useSelector(selectTestMode);
  const [intervalValue, setIntervalValue] = useState(-1);
  const [guessed, setGuessed] = useState();
  const [note1, setNote1] = useState();
  const [note2, setNote2] = useState();
  const [sound1, setSound1] = useState();
  const [sound2, setSound2] = useState();
  const keys = useKeys();

  const filteredKeys = useMemo(
    () =>
      keys
        .filter((key, i) =>
          keys.find((key2nd) => Math.abs(key2nd.index - key.index) <= maxRange)
        )
        .sort((a, b) => Math.sign(a.index - b.index)),
    [keys]
  );

  async function randomNote() {
    setGuessed(null);
    setNextDisabled(true);
    const note1Index = Math.floor(Math.random() * filteredKeys.length);
    const note1Randomed = filteredKeys[note1Index];
    const optionsFor2ndNote = filteredKeys
      .filter((key) => Math.abs(key.index - note1Randomed.index) <= maxRange)
      .map((item) => ({ ...item }));
    const note2Index = Math.floor(Math.random() * optionsFor2ndNote.length);
    const note2Randomed = optionsFor2ndNote[note2Index];
    setNote1(note1Randomed);
    setNote2(note2Randomed);
    setIntervalValue(Math.abs(note1Randomed.index - note2Randomed.index));
  }

  useEffect(() => {
    randomNote();
  }, [maxRange, filteredKeys]);

  async function guess(guessed) {
    setGuessed(guessed);
    // string to number
    if (guessed == intervalValue) {
      setNextDisabled(false);
    }
  }

  useEffect(() => {
    note1 !== undefined && note2 !== undefined && playSound(note1, note2);
  }, [note1, note2]);

  async function playSound(note1, note2) {
    console.log(note1, note2)
    let { sound } = await Audio.Sound.createAsync(note1.sound);
    setSound1(sound);
    await sound.playAsync();
    let { sound: sound2nd } = await Audio.Sound.createAsync(
      note2.sound
    );

    setTimeout(async () => {
      setSound2(sound2nd);
      await sound2nd.playAsync();
    }, delay);
  }
  useEffect(() => {
    return sound1
      ? () => {
          console.log('Unloading Sound');
          sound1.unloadAsync();
        }
      : undefined;
  }, [sound1]);
  useEffect(() => {
    return sound2
      ? () => {
          console.log('Unloading Sound');
          sound2.unloadAsync();
        }
      : undefined;
  }, [sound2]);

  return (
    <>
      <View style={{ backgroundColor: "lightsilver" }}>
        {testMode && (
          <MonoText>
            Interval: {intervalValue} ({note1 && note1.index} -{" "}
            {note2 && note2.index})
          </MonoText>
        )}
        <View style={[styles.func]}>
          <TouchableOpacity
            style={styles.round}
            onPress={() => playSound(note1, note2)}
          >
            <Ionicons
              name={"volume-medium-outline"}
              size={50}
              color={"white"}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.func]}>
          <Button
            title="Next"
            disabled={nextDisabled}
            style={styles.next}
            onPress={() => randomNote()}
          ></Button>
        </View>
      </View>
      <FlatList
        style={styles.container}
        numColumns={2}
        data={Object.keys(filteredKeys).slice(0, maxRange + 1)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => guess(item)}
            key={item}
            style={[
              styles.row,
              guessed == item && item == intervalValue
                ? styles.green
                : guessed === item && styles.red,
            ]}
          >
            <View>
              <MonoText>
                {item} semitone{item != 1 ? "s" : ""}
              </MonoText>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsilver",
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  row: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 20,
    backgroundColor: "white",
    margin: 4,
    borderRadius: 10,
  },
  round: {
    justifySelf: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "left",
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 10,
    backgroundColor: "lightblue",
  },
  next: {
    color: "lightblue",
    justifySelf: "center",
    alignSelf: "center",
    display: "flex",
    marginTop: 10,
    width: 300,
    height: 100,
    textColor: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  func: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#ddd",
    color: "#000",
    padding: 20,
  },
  green: {
    backgroundColor: "lightgreen",
  },
  red: {
    backgroundColor: "lightpink",
  },
});
