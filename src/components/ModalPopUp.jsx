import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ModalPopUp = ({ visible, children, onCancel }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <LinearGradient
                colors={["#E6C84F", "#E8807F"]}
                style={{ borderRadius: 20 }}
              >
                <TouchableOpacity onPress={onCancel}>
                  <Image
                    source={require("./../../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#13182b",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default ModalPopUp;
