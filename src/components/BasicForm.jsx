import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { FieldArray, Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const initialValues = {
  quantity: "",
  description: "",
  price: "",
};

export default function BasicForm() {
  return (
    <Formik
      initialValues={{ fields: [''] }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => {
        return (
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleQuantity}>Cant.</Text>
              <Text style={styles.titleDescription}>Producto</Text>
              <Text style={styles.titlePrice}>Precio</Text>
            </View>
            <FieldArray name='fields'>
            {({push, remove})=>(
              <View style={{flex:1, height:"100%",width:"100%"}}>
                {values.fields.map((field, index)=>(
                  
            <View style={styles.inputContainer} key={index}>
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
              {touched.fields && touched.fields[index] && errors.fields && errors.fields[index] && (
                      <Text style={{ color: 'red' }}>{errors.fields[index]}</Text>
                    )}
                    <LinearGradient
              colors={["#E6C84F", "#E8807F"]}
              style={{
                height: 40,
                width: "10%",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 3
      
              }}
            >
              <TouchableOpacity onPress={()=>{remove(index)}}>
                <Text style={{fontSize:60, lineHeight:54}}>-</Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>
                ))}
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
              <TouchableOpacity onPress={()=>{push('')}}>
                <Text>Agregar Linea</Text>
              </TouchableOpacity>
            </LinearGradient>
            </View>
                
              </View>
            )}
            </FieldArray>
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
    height:"100%",
    width:"100%"
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

  titleContainer: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },

  titleQuantity: {
    width: "10%",
    color: "white",
    marginRight:15
    
  },

  titleDescription: {
    width: "60%",
    textAlign: "center",
    color: "white",
  },

  titlePrice: {
    width: "15%",
    color: "white",
    marginRight:30
  },

  buttonContainer: {
    flex: 0.1,
    height: "100%",
    flexDirection: "row",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    marginTop:10
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
  }
});
