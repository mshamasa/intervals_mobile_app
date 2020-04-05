import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider(props) {
  const [bgTheme, setTheme] = useState("init");

  return (
    <ThemeContext.Provider value={[bgTheme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}
