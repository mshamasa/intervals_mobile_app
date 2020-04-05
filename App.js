import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Intervals from "./components/Intervals";
import ThemeProvider, { ThemeContext } from "./ThemeProvider";

function App() {
  const value = useContext(ThemeContext);
  const [bgTheme] = value;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${styles[bgTheme].backgroundColor}`,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Intervals />
    </View>
  );
}

export default function index() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  init: {
    backgroundColor: "#03a9f4"
  },
  stop: {
    backgroundColor: "#e91e63"
  },
  go: {
    backgroundColor: "#009688"
  }
});
