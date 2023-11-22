import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";

initialValues = {
    items: [
        {
            quantity: 0,
            price: 0
        }
    ]
}

export default function TicketScreen() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleQuantity}>Cant.</Text>
              <Text style={styles.titleDescription}>Producto</Text>
              <Text style={styles.titlePrice}>Precio</Text>
            </View>
            <View>
              <BasicForm />
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.total}>$0</Text>
            <LinearGradient
              colors={["#E6C84F", "#E8807F"]}
              style={{
                height: 40,
                width: "29%",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                
              }}
            >
              <TouchableOpacity onPress={handleSubmit}>
                <Text>Agregar Linea</Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
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
    fontSize: 30
  },

  total: {
    width: "45%",
    color: "white",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 30,
    paddingLeft: 5
  },
});
