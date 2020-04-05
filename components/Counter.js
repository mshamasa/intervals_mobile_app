import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Counter({ count, displayText }) {
  return (
    <View style={styles.Container}>
      {!!displayText && <Text style={styles.Text}>{displayText}</Text>}
      {!!count && <Text style={styles.Text}>{count}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: { flex: 1, paddingTop: 24, alignItems: "center" },
  Text: {
    fontSize: 24,
    paddingTop: 10
  }
});
