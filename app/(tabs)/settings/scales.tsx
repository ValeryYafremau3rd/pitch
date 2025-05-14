import { View, StyleSheet, Switch, FlatList } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setScale,
  toggleNote,
} from "../../store/slice";
import { Dropdown } from "react-native-element-dropdown";
import { SCALES } from "../../../constants/Scales";
import { MonoText } from "@/components/MonoText";
import { selectNotes, selectScale, selectDifficulty } from "../../store/selectors";

export default function ScalesScreen() {
  const notes = useSelector(selectNotes);
  const scale = useSelector(selectScale);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.singleRow}>
        <Dropdown
          data={Object.entries(SCALES).map(([scale, notes]) => ({
            scale: scale.replace("_", " "),
            notes,
          }))}
          style={styles.dropdown}
          maxHeight={300}
          labelField="scale"
          valueField="scale"
          value={scale}
          onChange={(item) => dispatch(setScale(item))}
        />
      </View>

      <FlatList
        numColumns={2}
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <MonoText style={styles.label}>{item.note}</MonoText>
            <Switch
              onValueChange={() => dispatch(toggleNote({ ...item }))}
              value={item.value}
            />
          </View>
        )}
      />
    </View>
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
    justifyContent: "space-between",
    alignConten: "center",
    fontSize: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 4,
  },
  singleRow: {
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "white",
    margin: 4,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    color: "black",
    fontSize: 20,
  }
});
