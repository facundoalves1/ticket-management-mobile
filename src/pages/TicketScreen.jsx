import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";

initialValues = {
  items: [
    {
      quantity: 0,
      price: 0,
    },
  ],
};

export default function TicketScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1, height:"100%",width:"100%"}}>
        <BasicForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#13182b",
  },

  titleContainer: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },

  titleQuantity: {
    width: "10%",
    color: "white",
    marginLeft: 10,
  },

  titleDescription: {
    width: "70%",
    textAlign: "center",
    color: "white",
  },

  titlePrice: {
    width: "15%",
    color: "white",
  },

  buttonContainer: {
    flex: 0.1,
    height: 40,
    flexDirection: "row",
    height: 40,
    textAlign: "center",
    justifyContent: "center",
  },

  totalLabel: {
    width: "20%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    textAlignVertical: "center",
    fontSize: 30,
  },

  total: {
    width: "45%",
    color: "white",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 30,
    paddingLeft: 5,
  },
});
