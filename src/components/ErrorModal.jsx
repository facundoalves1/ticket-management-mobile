import React from "react";
import { View, Text, Image } from "react-native";

const ErrorModal = ({ message = '' }) => {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../assets/cancelar.png")}
          style={{ height: 150, width: 150, marginVertical: 10 }}
        />
      </View>

      <Text
        style={{
          marginVertical: 30,
          fontSize: 20,
          textAlign: "center",
          color: "white",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default ErrorModal;
