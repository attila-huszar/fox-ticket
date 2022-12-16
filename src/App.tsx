import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";

function App({ Component }) {
  return (
    <NextUIProvider>
      <Component />
    </NextUIProvider>
  );
}

export default App;
