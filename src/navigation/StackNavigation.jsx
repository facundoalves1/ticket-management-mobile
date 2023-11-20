import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInPage from "../pages/Login";
import MainScreen from "../pages/MainScreen";



export default function StackNavigation(){

    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LogInPage} options={{headerShown:false}}/>
                <Stack.Screen name="HomeScreen" component={MainScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};