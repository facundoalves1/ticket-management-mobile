import { createStackNavigator } from "@react-navigation/stack";
import LogInPage from "../pages/Login";
import MainScreen from "../pages/MainScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ActivityIndicator } from "react-native";
import React, {useContext} from "react";
import { useLogin } from "../context/LoginPorvider";

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Obteniendo información...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function StackNavigation() {
  const Stack = createStackNavigator();

  const {isLogedIn, setLogedIn} = useLogin()
  const [isLoading,setLoading]=useState(true);
  
  const getUserSession = async()=>{

    try {
      const result = await AsyncStorage.getItem("token");
      setLogedIn(result);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    getUserSession();
  },[]);

  if(isLoading){
    return <SplashScreen/>
  }

  return (
      <Stack.Navigator>
        {isLogedIn == null ? (
          <Stack.Screen
            name="Login"
            component={LogInPage}
            options={{ 
            headerShown: false,
            animationTypeForReplace: isLoading ? 'pop' : 'push'
            }}
            initialParams={{setLogedIn}}
          />
        ) : (
          <Stack.Screen
            name="HomeScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
  );
}
