import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Button, Input } from "react-native-elements";

import { ThemeContext } from "../ThemeProvider";
import SetCounter from "./SetCounter";
import InputContainer from "./InputContainer";

const INT_IDS = [];

export default class Intervals extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);

    this.state = {
      on: "",
      off: "",
      reps: "",
      sets: "",
      rest: "",
      startReps: false
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleStart = () => {
    const { on, off, reps, sets, rest } = this.state;
    if (!on || !off || !reps || !sets || !rest) {
      return null;
    }
    this.setState({ startReps: true });
  };

  handleStop = () => {
    this.clearAllIntervals();
    const setTheme = this.context[1];
    setTheme("init");
    this.setState({
      on: "",
      off: "",
      reps: "",
      sets: "",
      rest: "",
      startReps: false
    });
  };

  clearAllIntervals = () => {
    while (INT_IDS.length) {
      let id = INT_IDS.shift();
      clearInterval(id);
      id = null;
    }
  };

  setIntervalIDS = ID => {
    INT_IDS.push(ID);
  };

  render() {
    const { on, off, reps, sets, rest, startReps } = this.state;
    const totalRepCount =
      (parseInt(on, 10) + parseInt(off, 10)) * parseInt(reps, 10);

    return (
      <>
        <StatusBar />
        <View style={styles.IntervalsContainer}>
          <View style={styles.ButtonContainer}>
            {!startReps && <Button onPress={this.handleStart} title="Start" />}
            {startReps && <Button onPress={this.handleStop} title="Clear" />}
          </View>
          {!startReps && (
            <InputContainer
              on={on}
              off={off}
              reps={reps}
              sets={sets}
              rest={rest}
              handleChange={this.handleChange}
            />
          )}
          <View style={styles.CounterContainer}>
            {startReps && (
              <SetCounter
                on={on && parseInt(on, 10)}
                off={off && parseInt(off, 10)}
                reps={reps && parseInt(reps, 10)}
                sets={sets && parseInt(sets, 10)}
                rest={rest && parseFloat(rest, 10)}
                totalRepCount={totalRepCount}
                setIntervalIDS={this.setIntervalIDS}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  IntervalsContainer: {
    flex: 1,
    width: "95%",
    justifyContent: "center"
  },
  CounterContainer: {
    flex: 1,
    marginBottom: 100
  },
  ButtonContainer: {
    flex: 1,
    marginTop: 100,
    marginBottom: -50,
    justifyContent: "center"
  }
});
