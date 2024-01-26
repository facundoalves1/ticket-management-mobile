import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogin } from "../context/LoginProvider";

const initialValues = {
  userid: "",
  password: "",
};

const image = require("../../assets/background.jpg");

export default function LogInPage() {

  const [isLoading, setLoading] = useState(false);
  const [isError,setError] = useState('');
  const {isLogedIn, setLogedIn} = useLogin();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(()=>{

    if(isError != '') fadeIn()

  },[isError])

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      const result = await AsyncStorage.getItem("token");
      setLogedIn(result);
    } catch (error) {
      console.log("Error token storage: ", error);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://casa-alves-management.onrender.com/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        await saveToken(response.data.payload.token);
      }
      
    } catch (error) {
      console.log("Authentication Error: ", error);
      setError('Usuario o Contraseña incorrecta');
      fadeIn();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (data) => {
        Keyboard.dismiss()
        await login(data);
      }}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
                  opacity: 1,
                }}
              >
                <MaskedView
                  style={styles.titleContainer}
                  maskElement={
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.titleText}>Casa Alves</Text>
                      <Text style={{ color: "white" }}>Administración</Text>
                    </View>
                  }
                >
                  <LinearGradient
                    colors={["#E6C84F", "#E8807F"]}
                    style={{
                      height: 100,
                      width: "100%",
                    }}
                  ></LinearGradient>
                </MaskedView>

                <TextInput
                  style={styles.textInput}
                  placeholder="Usuario"
                  onChangeText={handleChange("userid")}
                  onBlur={fadeOut}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Constraseña"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={fadeOut}

                />
                <LinearGradient
                  colors={["#E6C84F", "#E8807F"]}
                  style={{
                    marginTop: 30,
                    height: 40,
                    width: "90%",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.button}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                </LinearGradient>
                {isLoading && <LoadingSpinner isLoading={isLoading}/>}
                {
                isError && 
                <Animated.View
                style={[
                  {
                    opacity: fadeAnim,
                    borderRadius:10,
                    backgroundColor: "red",
                    height: 30,
                    marginTop:30,
                    width:"80%",
                    alignItems:"center"
                  }
                ]}
                >
                  <Text style={{lineHeight:30}}>Usuario o contraseña incorrecta</Text>
                </Animated.View>               
                }
              </ImageBackground>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  textInput: {
    backgroundColor: "#d9d9d9",
    marginTop: 10,
    borderRadius: 5,
    width: "90%",
    height: 40,
    paddingLeft: 10,
  },

  buttonContainer: {
    flex: 1,
    width: "90%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
  },

  button: {
    color: "white",
    lineHeight: 40,
  },

  titleContainer: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
  },

  titleText: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 50,
  },
});
