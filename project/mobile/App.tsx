import React from "react";
import { NativeRouter as Routers } from "react-router-native";
import Router from "./Router";
import { View } from "react-native";

export default function App() {
  return (
    <Routers>
      <Router />
    </Routers>
  );
}
