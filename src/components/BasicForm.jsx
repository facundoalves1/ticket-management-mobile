import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";

const initialValues = {
  quantity: "",
  description: "",
  price: "",
};

export default function BasicForm() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="1"
                value={values.quantity}
                onChange={handleChange("quantity")}
                style={styles.textInputQuant}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Descripción del producto"
                value={values.description}
                onChange={handleChange("description")}
                style={styles.textInputDesc}
                multiline
              />
              <TextInput
                placeholder="$0"
                value={values.price}
                onChange={handleChange("price")}
                style={styles.textInputPrice}
                keyboardType="numeric"
              />
            </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },

  textInputQuant: {
    width: "10%",
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    height: 40,
    textAlign: "center",
  },

  textInputDesc: {
    width: "70%",
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    height: 40,
    marginLeft: 3,
    marginRight: 3,
    textAlign: "center",
  },

  textInputPrice: {
    width: "15%",
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    height: 40,
    textAlign: "center",
  },
});
