import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TicketScreen(){
    return(

        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{color:'white'}}>Ticket Screen</Text>
            </View>
        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#13182b'
    }
})