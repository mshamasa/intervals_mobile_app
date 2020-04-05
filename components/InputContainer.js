import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

export default function InputContainer({
  on,
  off,
  reps,
  sets,
  rest,
  handleChange
}) {
  return (
    <View>
      <Input
        onChangeText={val => handleChange("on", val)}
        placeholder="on"
        value={on}
      />
      <Input
        onChangeText={val => handleChange("off", val)}
        placeholder="off"
        value={off}
      />
      <Input
        onChangeText={val => handleChange("reps", val)}
        placeholder="reps"
        value={reps}
      />
      <Input
        onChangeText={val => handleChange("sets", val)}
        placeholder="sets"
        value={sets}
      />
      <Input
        onChangeText={val => handleChange("rest", val)}
        placeholder="rest in minutes"
        value={rest}
      />
    </View>
  );
}
