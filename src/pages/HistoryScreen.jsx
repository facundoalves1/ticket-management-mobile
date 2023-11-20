import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen(){
    return(

        <SafeAreaView style={styles.container}>
            <View>
                <Text style={{color:'white'}}>History Screen</Text>
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