import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useState } from "react";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import { MonoText } from "@/components/MonoText";
import { useKeys } from "@/hooks/useKeys";
import { selectTestMode, selectDelay, selectSequence } from "../../store/selectors";

export default function IntervalScreen() {
  const [nextDisabled, setNextDisabled] = useState(true);
  const testMode = useSelector(selectTestMode);
  const delay = useSelector(selectDelay);
  const maxSequence = useSelector(selectSequence);
  const [sequence, setSequence] = useState([]);
  const [guessed, setGuessed] = useState(-1);
  const [guessedCount, setGuessedCount] = useState(0);
  const [isGuessed, setIsGuessed] = useState();
  const [sound, setSound] = useState();
  const filteredKeys = useKeys();

  async function randomNote() {
    setGuessed(null);
    setNextDisabled(true);
    const notesInOrder = [];
    for (let i = 0; i < maxSequence; i++) {
      notesInOrder.push(
        filteredKeys[Math.round(Math.random() * filteredKeys.length)]
      );
    }
    setSequence(notesInOrder);
    setGuessedCount(0);
  }

  useEffect(() => {
    playSound();
  }, [sequence]);

  //fix calculate before
  useMemo(() => {
    randomNote();
  }, [ maxSequence, filteredKeys]);

  async function guess(guessed) {
    setGuessed(guessed);
    if (guessedCount === sequence.length - 1) return;
    if (
      guessed ===
      Math.sign(sequence[guessedCount + 1].index - sequence[guessedCount].index)
    ) {
      setIsGuessed(true)
      setGuessedCount(guessedCount + 1);
      if (guessedCount === sequence.length - 2) {
        setNextDisabled(false);
      }
    } else {
      setIsGuessed(false)
    }
  }

  async function playSound() {
    if (sequence.includes(undefined)) return randomNote();
    sequence.forEach((note, index) => {
      setTimeout(async () => {
        let { sound } = await Audio.Sound.createAsync(note.sound);
        await sound.playAsync()
        setSound(sound)
      }, delay * index);
    });
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  return (
    <View>
      {testMode && (
        <MonoText>
          Order: {sequence && sequence.map((sound, i) => (<Text>{i > 0 && ' > ' }{sound.note}{sound.octave}</Text>))}
        </MonoText>
      )}
      <View style={[styles.func]}>
        <TouchableOpacity
          style={styles.round}
          onPress={() => playSound()}
        >
          <Ionicons
            name={"volume-medium-outline"}
            size={50}
            color="white"
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.func]}>
        <Button
          title="Next"
          disabled={nextDisabled}
          onPress={() => randomNote()}
        />
      </View>

      <View style={styles.orderContainer}>
        <ScrollView style={styles.order} horizontal={true}>
          {sequence.map((note, i) => {
            if (i > guessedCount) return;
            return (
              <View style={styles.stack} key={i}>
                <Text style={{alignSelf: 'center', color: 'white'}}>
                  {note.note}
                  {note.octave}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => guess(1)}
          style={[
            styles.row,
            guessed === 1 && isGuessed === true
              ? styles.green
              : guessed === 1 && styles.red,
          ]}
        >
          <View>
            <Ionicons
              name={"arrow-up-outline"}
              size={30}
              color={"grey"}
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => guess(0)}
          style={[
            styles.row,
            guessed === 0 && isGuessed === true
              ? styles.green
              : guessed === 0 && styles.red,
          ]}
        >
          <View>
            <Ionicons
              name={"reorder-two-outline"}
              size={30}
              color={"grey"}
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => guess(-1)}
          style={[
            styles.row,
            guessed === -1 && isGuessed === true
              ? styles.green
              : guessed === -1 && styles.red,
          ]}
        >
          <View>
            <Ionicons
              name={"arrow-down-outline"}
              size={30}
              color={"grey"}
              style={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: { marginTop: 15 },
  order: { flexDirection: "row", height: 70 },
  stack: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 10,
    padding: 5,
    marginRight: 5,
    flex: 1,
    backgroundColor: "darkturquoise",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    backgroundColor: "lightsilver",
    padding: 20,
  },
  row: {
    padding: 20,
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
    alignContent: "center",
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
