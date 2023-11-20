import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialValues = {
  user: "",
  password: "",
};

const image = require("../../assets/background.jpg");
export default function LogInPage() {

  const navigation = useNavigation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => navigation.navigate("HomeScreen")}
    >
      {({ handleChange, handleSubmit, values }) => {
        return (
          <SafeAreaView style={{flex:1}}>
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
                <MaskedView style={styles.titleContainer} maskElement={
                  
                  
                  <View style={{alignItems:"center"}}>
                    <Text style={styles.titleText}>Casa Alves</Text>
                    <Text style={{color: "white"}}>Administración</Text>
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
                  value={values.user}
                  onChangeText={handleChange("user")}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Constraseña"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange("password")}
                />
                <LinearGradient
                  colors={["#E6C84F", "#E8807F"]}
                  style={{
                    marginTop: 30,
                    height: 40,
                    width: "90%",
                    borderRadius: 5,
                    justifyContent:"center",
                    alignItems:"center"
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.button}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                </LinearGradient> 
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
    flex:1,
    width: "90%",
    height: 40,
    borderRadius: 5,
    alignItems:"center"
  },

  button: {
    
    color: "white",
    lineHeight: 40,

  },

  titleContainer: {
    flex: 0.3,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white"
  },

  titleText: {
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 50,
  },
});
