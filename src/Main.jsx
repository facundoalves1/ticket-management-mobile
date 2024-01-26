import React, { useState } from "react";
import StackNavigation from "./navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginProvider from "./context/LoginProvider";
import ContextProvider from "./context/ContextProvider";

export default function Main() {
  return (
    <LoginProvider>
      <ContextProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      </ContextProvider>
    </LoginProvider>
  );
}
