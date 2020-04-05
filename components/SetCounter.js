import React from "react";

import RepCounter from "./RepCounter";
import Counter from "./Counter";

let COUNT_DN_ID = null;

export default class SetCounter extends React.Component {
  state = {
    count: 0,
    displayText: "",
    start: false,
    currentSet: 1
  };

  componentDidMount() {
    this.startCountDown();
  }

  startInterval = countStop => {
    let count = 1;
    COUNT_DN_ID = setInterval(
      st => {
        const secondsCounter = Math.floor((Date.now() - st) / 1000);

        if (secondsCounter === count) {
          count++;
          this.setState({ count });
        }

        if (secondsCounter === countStop) {
          this.startReps();
          clearInterval(COUNT_DN_ID);
          COUNT_DN_ID = null;
        }
      },
      10,
      Date.now()
    );
    this.props.setIntervalIDS(COUNT_DN_ID);
  };

  startCountDown = () => {
    const num = 3;
    this.setState({ displayText: `Starting In ${num}`, count: 1 });
    this.startInterval(num);
  };

  startReps = () => {
    this.setState({ start: true });
  };

  startRestTimer = () => {
    const { rest } = this.props;
    const restCount = Math.floor(rest * 60);
    this.setState({
      displayText: `Starting Again In ${restCount}`,
      count: 1
    });
    this.startInterval(restCount);
  };

  handleRepsCompleted = () => {
    this.setState({ start: false });

    if (this.state.currentSet < this.props.sets) {
      this.startRestTimer();
      this.setState({ currentSet: this.state.currentSet + 1 });
    } else {
      this.setState({ count: 0, displayText: "All Done, Good Job. 👍" });
    }
  };

  render() {
    const { on, off, reps } = this.props;
    const { start, count, displayText } = this.state;

    if (!start) {
      return <Counter count={count} displayText={displayText} />;
    }

    return (
      <RepCounter
        on={on}
        off={off}
        reps={reps}
        repsCompleted={this.handleRepsCompleted}
        setIntervalIDS={this.props.setIntervalIDS}
      />
    );
  }
}
