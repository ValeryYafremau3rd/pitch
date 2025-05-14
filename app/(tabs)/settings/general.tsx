import { View, StyleSheet, Switch, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {toggle } from "../../store/slice";
import { MonoText } from "@/components/MonoText";
import { selectTestMode } from "../../store/selectors";
import { tintBlue } from "@/constants/Colors";

export default function GeneralScreen() {
  const testMode = useSelector(selectTestMode);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <MonoText>Test mode</MonoText>
        <Switch
          onValueChange={() => dispatch(toggle())}
          value={testMode}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightsilver',
    padding: 20,
  },
  row: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignConten: "center",
    fontSize: 20,
    backgroundColor: "white",
    margin: 4,
    borderRadius: 10
  }
});
