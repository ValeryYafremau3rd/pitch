import { View, StyleSheet, Switch, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOctave } from "../../store/slice";
import { MonoText } from "@/components/MonoText";
import { selectOctaves } from "../../store/selectors";

export default function OctavesScreen() {
  const octaves = useSelector(selectOctaves);
  const dispatch = useDispatch();

  return (
    <FlatList
      style={styles.container}
      numColumns={2}
      data={octaves}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <MonoText style={styles.label}>{item.octave}</MonoText>
          <Switch
            onValueChange={() => dispatch(toggleOctave({ ...item }))}
            value={item.value}
          />
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsilver",
    padding: 20,
    flex: 1,
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
  label: {
    color: "black",
    fontSize: 20,
  },
});
