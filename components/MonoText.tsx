import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export function MonoText({ children }: PropsWithChildren) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 20,
  },
});
