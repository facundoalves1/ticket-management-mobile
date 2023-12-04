import React, { useState } from "react";
import StackNavigation from "./navigation/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import LoginProvider from "./context/LoginPorvider";

export default function Main() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </LoginProvider>
  );
}
