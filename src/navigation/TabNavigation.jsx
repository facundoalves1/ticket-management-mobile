import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TicketScreen from "../pages/TicketScreen";
import HistoryScreen from "../pages/HistoryScreen";
import  {FontAwesome5}  from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";


export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
    screenOptions={{
        tabBarBackground: ()=>(
            <View style={{flex:1}}>
                <LinearGradient colors={["#E6C84F", "#E8807F"]} style={{width:'100%',height:'100%'}}></LinearGradient>
            </View>
        )
    }}
    >
      <Tab.Screen
        name="Nuevo Ticket"
        component={TicketScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="plus" size={26} color="black" />
          ),
          headerShown: false,
          tabBarLabelStyle:{color:'black'},
          tabBarActiveBackgroundColor: "#E8807F"
        }}
      />
      <Tab.Screen
        name="Historial de Tickets"
        component={HistoryScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="receipt" size={26} color="black" />
          ),
          headerShown: false,
          tabBarLabelStyle:{color:'black'},
          tabBarActiveBackgroundColor: "#E8807F"
        }}
      />
    </Tab.Navigator>
  );
}
