import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import { useGeneralContext } from "../context/ContextProvider"
import {useIsMount} from "../customHooks/useIsMount"
import {GET_ITEM_BY_BARCODE} from "../api/itemsApi";

export default function BasicForm({isClicked, setClicked, setTotal}) {
  const navigator = useNavigation();
  const isMount = useIsMount();
  
  const {barCode, setBarCode, setContextKey, contextKey} = useGeneralContext();

  const removeItem = (keyToRemove) => {
    const updatedData = isClicked.filter((item) => item.key !== keyToRemove);
    setClicked(updatedData);

    let result = 0;

    updatedData.map((element) => {
      if (parseInt(element.price) && parseInt(element.quantity))
        result += parseInt(element.price) * parseInt(element.quantity);
    });

    setTotal("$" + result.toString());
  };

  const handleChange = (newValue, key, prop) => {
    setClicked((data) => {
      const value = prop;

      return data.map((item) => {
        if (item.key == key) {
          if (value == "quantity" && !parseInt(newValue)) {
            newValue = 1;
            return { ...item, [value]: newValue.toString() };
          }
          return { ...item, [value]: newValue };
        }

        return item;
      });
    });
  };

  const handleTotal = () => {
    let result = 0;

    isClicked.map((element) => {
      if (parseInt(element.price) && parseInt(element.quantity))
        result += parseInt(element.price) * parseInt(element.quantity);
    });

    setTotal("$" + result.toString());
  };

  const handleScanner = (key)=>{

    setContextKey(key)
    navigator.navigate("BarScanner");

  }

  useEffect(()=>{

    if(!isMount){

      setClicked((data) => {
        const value = "barcode";  
        return data.map((item) => {
          if (item.key == barCode.key) {
            if (value == "quantity" && !parseInt(newValue)) {
              newValue = 1;
              return { ...item, [value]: newValue.toString() };
            }
            return { ...item, [value]: barCode.barcode };
          }  
          return item;
        });
      });
      async function fetchData(){
        await GET_ITEM_BY_BARCODE(barCode.barcode).then((res)=>{

          if(res){
            let newObj = {
  
              "barcode": barCode.barcode,
              "internalcode": res.internalcode,
              "name": res.name,
              "price": res.price,
              "quantity": 1,
              "key": barCode.key
            }
            console.log(newObj);
            setClicked((data)=>{
              return data.map((item)=>{
                if(item.key == barCode.key){
                  return {
                    "barcode": barCode.barcode,
                    "internalcode": res.internalcode,
                    "name": res.name,
                    "price": res.price.toString(),
                    "quantity": 1,
                  }
                }
              })
            });
          }
        });
        console.log(isClicked);
      }
      fetchData();
      }

    console.log("render");

  },[barCode])

  return (
    <View style={{flex:1}}>
      <FlatList
        data={isClicked}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput
              placeholder="1"
              onChangeText={(newValue) =>
                handleChange(newValue, item.key, "quantity")
              }
              onBlur={handleTotal}
              style={styles.textInputQuant}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Descripción del producto"
              onChangeText={(newValue) =>
                handleChange(newValue, item.key, "name")
              }
              style={styles.textInputDesc}
              multiline
              value={item.name}
            />
            <TextInput
              placeholder="$0"
              onChangeText={(newValue) =>
                handleChange(newValue, item.key, "price")
              }
              onBlur={handleTotal}
              style={styles.textInputPrice}
              keyboardType="numeric"
              value={item.price}
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
                  removeItem(item.key);
                }}
              >
                <FontAwesome5 name="times" size={26} color="black" />
              </TouchableOpacity>
            </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
              placeholder="Codigo Interno"
              onChangeText={(newValue) =>
                handleChange(newValue, item.key, "internalcode")
              }
              value={item.internalcode}
              style={styles.internalcode}
              multiline
            />
            <TextInput
              placeholder="Codigo de barras"
              onChangeText={(newValue) =>
                handleChange(newValue, item.key, "barcode")
              }
              value={item.barcode}
              style={styles.barCodeInput}
              keyboardType="numeric"
              multiline
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
                  handleScanner(item.key);
                }}
              >
                <MaterialCommunityIcons name="barcode-scan" size={26} color="black" />
              </TouchableOpacity>
            </LinearGradient>
            </View>
          </View>
        )}
      />
      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "column",
    alignItems:"center",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5
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

  barCodeInput: {
    width: "50%",
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    height: 40,
    marginLeft: 3,
    marginRight: 3,
    textAlign: "center",
  },

  internalcode:{
    width: "35%",
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
