import React from "react";
import { ThemeContext } from "../ThemeProvider";

import Counter from "./Counter";

let REP_INT_ID = null;

export default class RepCounter extends React.Component {
  static contextType = ThemeContext;

  state = {
    count: 0,
    isRest: false,
    displayText: ""
  };

  componentDidMount() {
    this.handleRepsStart();
  }

  complete = () => {
    const setTheme = this.context[1];
    setTheme("init");
    this.setState({ isRest: false, count: 0, displayText: "" });
    this.props.repsCompleted();
  };

  updateState = (isRest, count) => {
    const setTheme = this.context[1];
    const theme = isRest ? "stop" : "go";
    setTheme(theme);
    this.setState({ isRest, count, displayText: theme.toUpperCase() });
  };

  handleRepsStart = () => {
    const { on, off, reps } = this.props;
    let repCounter = 0;
    let offCounter = 0;
    let onCounter = 0;
    let restBool = false;
    let count = 1;
    const totalRepCount = (on + off) * reps;

    REP_INT_ID = setInterval(
      (startTime, callback) => {
        const secondsCounter = Math.floor((Date.now() - startTime) / 1000);
        // start interval
        if (secondsCounter === count && secondsCounter <= totalRepCount) {
          if (!restBool && onCounter < on) {
            onCounter++;
            this.updateState(restBool, onCounter);
          }

          if (restBool && offCounter < off) {
            offCounter++;
            this.updateState(restBool, offCounter);
          }

          if (onCounter === on) {
            restBool = true;
          }

          if (offCounter === off) {
            restBool = false;
          }

          if (onCounter === on && offCounter === off && repCounter < reps) {
            repCounter++;
            onCounter = 0;
            offCounter = 0;
          }
          count++;
        }

        if (secondsCounter > totalRepCount) {
          clearInterval(REP_INT_ID);
          REP_INT_ID = null;
          this.complete();
        }
      },
      10,
      Date.now()
    );
    this.props.setIntervalIDS(REP_INT_ID);
  };

  render() {
    const { count, isRest, displayText } = this.state;

    if (!count && !isRest && !displayText) {
      return null;
    }

    return <Counter count={count} displayText={displayText} />;
  }
}
