import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TicketScreen() {
  const [isClicked, setClicked] = useState([{ key: "1", quantity: "1", name:"", price:"" }]);
  const [total,setTotal]=useState('$0');

  const handleChange = () => {

    if (isClicked.length >= 1) {

      let lastKey = isClicked[isClicked.length - 1].key;
      let keyNumber = parseInt(lastKey) + 1;
      let newField = { key: keyNumber.toString(), quantity: "1", name:"", price:"" };

      setClicked((items) => [...items, newField]);

    } else {

      let firstField = { key: "1", quantity: "1", name:"", price:"" };
      setClicked((items) => [...items, firstField]);

    }
  };
  
  const dataHandler = ()=>{

    const data = isClicked.slice();

    data.forEach(element=>{

      delete element.key
      element.price = parseInt(element.price);
      element.quantity = parseInt(element.quantity);

    })

    const newData = {items: data, total:0}

    return newData;

  }

  const submitTicket = async(data)=>{

    const token = await AsyncStorage.getItem('token');
    
    try{

      const response = await axios.post('https://casa-alves-management.onrender.com/api/tickets/saveTicket', data, {

      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
        'Content-Type': 'application/json',
      },

      });

      console.log('Data successfully posted to the backend:', response.data);

    } 
    catch(error){

      console.error('Error posting data:', error);

    }
    

  }

  const handleSubmit = ()=>{

    const data = dataHandler();

    submitTicket(data);

  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleQuantity}>Cant.</Text>
        <Text style={styles.titleDescription}>Producto</Text>
        <Text style={styles.titlePrice}>Precio</Text>
      </View>
      <BasicForm isClicked={isClicked} setClicked={setClicked} total={total} setTotal={setTotal} />
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.total}>{total}</Text>
        </View>
        <View style={styles.buttonContainer2}>
        <LinearGradient
          colors={["#E6C84F", "#E8807F"]}
          style={{
            height: "80%",
            width: "49%",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text>Guardar e Imprimir</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={["#E6C84F", "#E8807F"]}
          style={{     
            height: "80%",
            width: "49%",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleChange();
            }}
          >
            <Text>Agregar Linea</Text>
          </TouchableOpacity>
        </LinearGradient>
        </View>
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
    flex:0.2,
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
    justifyContent: "space-around",
    bottom: 0,
    backgroundColor: "#13182b",
    marginBottom: 10,
  },

  buttonContainer2: {
   
    flexDirection:"row",
    justifyContent:"space-around"

  },

  textContainer: {

    
    flexDirection:"row"

  },

  totalLabel: {
    //width: "21%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
  },

  total: {
    //width: "45%",
    color: "white",
    textAlign: "left",
    fontSize: 30,
    paddingLeft: 5,
    marginTop: 10,
    marginRight:10
  },
});
