import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BasicForm({isClicked, setClicked, total, setTotal}) {
  
  const removeItem = (keyToRemove) => {
    const updatedData = isClicked.filter((item) => item.key !== keyToRemove);
    setClicked(updatedData);

    let result = 0;

    updatedData.map(element=>{

      if(parseInt(element.price) && parseInt(element.quantity)) result += parseInt(element.price) * parseInt(element.quantity);

    });

    setTotal('$'+result.toString());
    
  };

  const handleChange = (newValue,key,prop)=>{
    
    setClicked((data)=>{

      const value = prop;

      return data.map((item)=>{

        if(item.key == key){
          
          if(value == 'quantity' && !parseInt(newValue)){

            newValue = 1
            return {...item, [value]:newValue.toString()}

          }
          return {...item, [value]:newValue}

        }

        return item

      })

    })

  };

  const handleTotal = ()=>{

    let result = 0;

    isClicked.map(element=>{

      if(parseInt(element.price) && parseInt(element.quantity)) result += parseInt(element.price) * parseInt(element.quantity);

    });

    setTotal('$'+result.toString());

  };

  
  return (
    <View style={{flex:1}}>
      <FlatList
        data={isClicked}
        renderItem={({item})=>(
          <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="1"
                        onChangeText={(newValue)=>handleChange(newValue,item.key,"quantity")}
                        onBlur={handleTotal}
                        style={styles.textInputQuant}
                        keyboardType="numeric"
                      />
                      <TextInput
                        placeholder='Descripción del producto'
                        onChangeText={(newValue)=>handleChange(newValue,item.key,"name")}
                        style={styles.textInputDesc}
                        multiline
                      />
                      <TextInput
                        placeholder="$0"
                        onChangeText={(newValue)=>handleChange(newValue,item.key,"price")}
                        onBlur={handleTotal}
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
                            
                            removeItem(item.key)

                          }}
                        >
                          <Text style={{ fontSize: 60, lineHeight: 54 }}>
                            -
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
        )}
      />
    </View>     
                 
  )
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