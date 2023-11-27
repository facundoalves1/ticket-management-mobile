import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { FieldArray, Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";

export default function BasicForm({ isClicked }) {
  console.log(isClicked)
  return (
    <Formik
      initialValues={isClicked}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <View>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <View>
                  {values.items.map((field, index) => (
                    <View style={styles.inputContainer} key={index}>
                      <TextInput
                        //placeholder="1"
                        placeholder={field.key}
                        value={values.quantity}
                        onChange={handleChange("quantity")}
                        style={styles.textInputQuant}
                        keyboardType="numeric"
                      />
                      <TextInput
                        //placeholder="Descripción del producto"
                        placeholder={field.key}
                        value={values.description}
                        onChange={handleChange("description")}
                        style={styles.textInputDesc}
                        multiline
                      />
                      <TextInput
                        //placeholder="$0"
                        placeholder={field.key}
                        value={values.price}
                        onChange={handleChange("price")}
                        style={styles.textInputPrice}
                        keyboardType="numeric"
                      />
                      <LinearGradient
                        colors={["#E6C84F", "#E8807F"]}
                        style={{
                          height: 40,
                          width: "10%",
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 3,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            arrayHelpers.remove(index);
                          }}
                        >
                          <Text style={{ fontSize: 60, lineHeight: 54 }}>
                            -
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  ))}
                </View>
              )}
            />
          </View>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  textInputQuant: {
    width: "10%",
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    height: 40,
    textAlign: "center",
  },

  textInputDesc: {
    width: "60%",
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

  buttonContainer: {
    flex:1,
    width: "100%",
    flexDirection: "row",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    position: "relative"
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
