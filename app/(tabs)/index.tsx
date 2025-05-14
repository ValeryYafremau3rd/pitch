import { Text, View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import { useKeys } from "@/hooks/useKeys";
import { selectOctaves } from "../store/selectors";
import calcKeyColor from "@/serives/keyColors";

export default function Keypad() {
  const octaves = useSelector(selectOctaves);
  const filteredKeys = useKeys();
  const [cols, setCols] = useState(null);
  const [sound, setSound] = useState();

  async function playSound(note) {
    const { sound } = await Audio.Sound.createAsync(note);
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    setCols(() => octaves.filter((octave) => octave.value === true).length);
  }, [octaves]);
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View className="container">
      <FlatList
        key={cols}
        numColumns={cols}
        data={filteredKeys.sort((a, b) => a.key - b.key)}
        renderItem={({ item }) => (
          <View
            style={[styles.key, calcKeyColor(item.key)]}
            onTouchStart={() => playSound(item.sound)}
          >
            <Text style={styles.text}>{item.note + item.octave}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  key: {
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    flex: 1,
    minHeight: 60,
    fontSize: 20,
  },
});
