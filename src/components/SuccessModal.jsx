import React from "react";
import { View, Text, Image } from "react-native";

const SuccessModal = ({ message = '' }) => {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../assets/success.png")}
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

export default SuccessModal;
