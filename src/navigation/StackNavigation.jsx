import React, {useEffect,useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInPage from "../pages/Login";
import MainScreen from "../pages/MainScreen";
import { BackHandler } from "react-native";

export default function StackNavigation(){

    const Stack = createStackNavigator();

        //Remove the use of the back button
        useEffect(() => {
            const handleBackButton = () => true;
            BackHandler.addEventListener("hardwareBackPress", handleBackButton);
            return () => {
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    handleBackButton
                );
            };
        }, []);

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LogInPage} options={{headerShown:false}}/>
                <Stack.Screen name="HomeScreen" component={MainScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};