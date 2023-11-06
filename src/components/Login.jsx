import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Casa Alves</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 50,
    color: "white",
    paddingTop: 200,
  },
  text: {
    color: "white",
    fontSize: 30,
    paddingTop: 50,
  },
  textInput: {    
    backgroundColor: "white",
    borderColor: "gray",
    width: 250,
  },
  textContainer: {
    backgroundColor: "black",
    justifyContent: "space-between"
  }
});
