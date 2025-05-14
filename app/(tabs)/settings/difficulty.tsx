import { View, StyleSheet, Switch, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDelay,
  setDifficulty,
  setSemitones,
  setSequence,
} from "../../store/slice";
import { Dropdown } from "react-native-element-dropdown";
import { Slider } from "@miblanchard/react-native-slider";
import { MonoText } from "@/components/MonoText";
import {
  selectDelay,
  selectDifficulty,
  selectSemitones,
  selectSequence,
} from "../../store/selectors";
import { Difficulty } from "@/constants/Difficulties";
import { tintBlue } from "@/constants/Colors";

export default function DifficultyScreen() {
  const maxSequence = useSelector(selectSequence);
  const delay = useSelector(selectDelay);
  const semitones = useSelector(selectSemitones);
  const difficulty = useSelector(selectDifficulty);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Dropdown
          data={Object.entries(Difficulty).map(([label, value]) => ({
            label,
            value,
          }))}
          style={[styles.dropdown]}
          maxHeight={300}
          labelField="value"
          valueField="value"
          value={difficulty}
          onChange={(item) => {
            dispatch(setDifficulty(item.label));
          }}
        />
      </View>
      <View style={styles.row}>
        <MonoText>Maximum interval range: {semitones} semitones</MonoText>
        <Slider
          value={semitones}
          thumbTintColor="#81b0ff"
          minimumTrackTintColor="#81b0ff"
          onValueChange={(value) => dispatch(setSemitones(value))}
          minimumValue={1}
          step={1}
          maximumValue={12}
        />
      </View>
      <View style={styles.row}>
        <MonoText>Interval delay: {delay} ms</MonoText>
        <Slider
          value={delay}
          thumbTintColor={tintBlue}
          minimumTrackTintColor={tintBlue}
          onValueChange={(value) => dispatch(setDelay(value))}
          minimumValue={0}
          step={100}
          maximumValue={1000}
        />
      </View>
      <View style={styles.row}>
        <MonoText>Max sequence of notes: {maxSequence} notes</MonoText>
        <Slider
          value={maxSequence}
          thumbTintColor={tintBlue}
          minimumTrackTintColor={tintBlue}
          onValueChange={(value) => dispatch(setSequence(value))}
          minimumValue={2}
          step={1}
          maximumValue={9}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsilver",
    flex: 1,
    padding: 20,
  },
  row: {
    padding: 20,
    alignConten: "center",
    backgroundColor: "white",
    margin: 4,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    color: "red",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }
});
