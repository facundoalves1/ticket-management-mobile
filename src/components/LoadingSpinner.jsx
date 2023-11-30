import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingSpinner({isLoading}) {
  return (

    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white background
    },
  });