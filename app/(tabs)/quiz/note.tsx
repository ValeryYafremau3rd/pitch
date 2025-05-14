import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useKeys } from "@/hooks/useKeys";
import { MonoText } from "@/components/MonoText";
import { selectTestMode } from "../../store/selectors";

export default function AboutScreen() {
  const testMode = useSelector(selectTestMode);
  const filteredKeys = useKeys();
  const [nextDisabled, setNextDisabled] = useState(true);
  const [guessed, setGuessed] = useState(null);
  const [note, setNote] = useState();
  const [playNext, setPlayNext] = useState(true);

  async function randomNote() {
    setGuessed(null);
    setNextDisabled(true);
    const refreshed =
      filteredKeys[Math.round(Math.random() * filteredKeys.length) - 1];
    setNote(refreshed);
  }

  async function guess(guessed) {
    setGuessed(guessed);
    if (guessed === note.note) {
      setNextDisabled(false);
      setPlayNext(true);
    }
  }

  async function playSound(note) {
    console.log(note)
    const { sound } = await Audio.Sound.createAsync(note.sound);
    setPlayNext(false);

    await sound.playAsync();
  }

  useEffect(() => {
    playSound(note);
  }, [playNext]);

  //useMemo
  useEffect(() => {
    setNote(filteredKeys[Math.round(Math.random() * filteredKeys.length) - 1]);
  }, [filteredKeys]);

  return (
    note && (
      <View style={{ flex: 1, backgroundColor: "lightsilver" }}>
        <View>
          {testMode && <Text>Note: {note.note}</Text>}
          <View style={[styles.func]}>
            <TouchableOpacity
              style={styles.round}
              onPress={() => playSound(note)}
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
              onPress={() => randomNote()}
            />
          </View>
        </View>
        <FlatList
          style={styles.container}
          numColumns={2}
          data={[...new Set(filteredKeys.map(({ note }) => note))]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => guess(item)}
              key={item}
              style={[
                styles.row,
                guessed === item && item === note.note
                  ? styles.green
                  : guessed === item && item !== note.note && styles.red,
              ]}
            >
              <View>
                <MonoText>{item}</MonoText>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsilver",
    padding: 20,
    paddingBottom: 0,
    paddingTop: 0,
  },
  row: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignConten: "center",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 4,
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
