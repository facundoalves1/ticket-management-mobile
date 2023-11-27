import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
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

  const [isClicked, setClicked] = useState({items:[{ key: "1", text: "" }]});

  const handleChange = ()=>{

    let lastKey = isClicked.items[isClicked.items.length - 1].key;
    let keyNumber = parseInt(lastKey) + 1;
    let newField = {key: keyNumber.toString(), text: ""};
    let finalObject = isClicked.items.push(newField);

    setClicked(items=>({...items,...finalObject}))

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleQuantity}>Cant.</Text>
        <Text style={styles.titleDescription}>Producto</Text>
        <Text style={styles.titlePrice}>Precio</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <BasicForm isClicked={isClicked}/>
      </ScrollView>
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
          <TouchableOpacity
            onPress={()=>{handleChange()}}
          >
            <Text>Agregar Linea</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
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
    marginRight: 15,
  },

  titleDescription: {
    width: "60%",
    textAlign: "center",
    color: "white",
  },

  titlePrice: {
    width: "15%",
    color: "white",
    marginRight: 30,
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    bottom: 0,
    backgroundColor: "#13182b",
    marginBottom: 10,
  },

  totalLabel: {
    width: "21%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
  },

  total: {
    width: "45%",
    color: "white",
    textAlign: "left",
    fontSize: 30,
    paddingLeft: 5,
    marginTop: 10,
  },
});
