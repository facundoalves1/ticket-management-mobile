import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Image,
  Animated,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogin } from "../context/LoginPorvider";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
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
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const SuccessModal = () => {
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
        Ticket guardado e impreso exitosamente
      </Text>
    </View>
  );
};

const ErrorModal = () => {
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
        Error al guardar o imprimir ticket
      </Text>
    </View>
  );
};
export default function TicketScreen() {
  const [isClicked, setClicked] = useState([
    { key: "1", quantity: "1", name: "", price: "" },
  ]);
  const [total, setTotal] = useState("$0");
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isLogedIn, setLogedIn } = useLogin();
  const [isError, setError] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleChange = () => {
    if (isClicked.length >= 1) {
      let lastKey = isClicked[isClicked.length - 1].key;
      let keyNumber = parseInt(lastKey) + 1;
      let newField = {
        key: keyNumber.toString(),
        quantity: "1",
        name: "",
        price: "",
      };

      setClicked((items) => [...items, newField]);
    } else {
      let firstField = { key: "1", quantity: "1", name: "", price: "" };
      setClicked((items) => [...items, firstField]);
    }
  };

  const dataHandler = () => {
    const data = isClicked.slice();

    data.forEach((element) => {
      delete element.key;
      element.price = parseInt(element.price);
      element.quantity = parseInt(element.quantity);
    });

    const newData = { items: data, total: 0 };

    return newData;
  };

  const submitTicket = async (data) => {
    const token = await AsyncStorage.getItem("token");

    setLoading(true);
    const response = await axios
      .post(
        "https://casa-alves-management.onrender.com/api/tickets/saveTicket",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setClicked([]);
        setTotal("$0");
        setLoading(false);
        setVisible(true);
        console.log("Data successfully posted to the backend:", res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        const { message } = err.response.data;
        if (message == "PAYLOAD_DATA_NOT_FOUND") {
          AsyncStorage.removeItem("token");
          setLogedIn(null);
        }
        setClicked([]);
        setError(true);
        setVisible(true);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    const data = dataHandler();

    submitTicket(data);
  };

  const onPessCancel = ()=>{
    setVisible(false);
    setTimeout(() => {
      setError(false);
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleQuantity}>Cant.</Text>
        <Text style={styles.titleDescription}>Producto</Text>
        <Text style={styles.titlePrice}>Precio</Text>
        <Text style={{ width: "10%" }}></Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <BasicForm
          isClicked={isClicked}
          setClicked={setClicked}
          total={total}
          setTotal={setTotal}
        />
        <ModalPoup visible={visible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <LinearGradient
                colors={["#E6C84F", "#E8807F"]}
                style={{ borderRadius: 20 }}
              >
                <TouchableOpacity onPress={onPessCancel}>
                  <Image
                    source={require("./../../assets/x.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {!isError ? (<SuccessModal/>):(<ErrorModal/>)}
        </ModalPoup>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.total}>{total}</Text>
        </View>
        <View style={styles.buttonContainer2}>
          <LinearGradient
            colors={["#E6C84F", "#E8807F"]}
            style={{
              height: "60%",
              width: "47%",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text>Guardar e Imprimir</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["#E6C84F", "#E8807F"]}
            style={{
              height: "60%",
              width: "47%",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
            style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}
              onPress={() => {
                handleChange();
              }}
            >
              <Text>Agregar Linea</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#13182b",
  },

  titleContainer: {
    //marginTop: 20,
    justifyContent: "center",
    flexDirection: "row",
  },

  titleQuantity: {
    width: "10%",
    color: "white",
    textAlign: "center",
  },

  titleDescription: {
    width: "60%",
    textAlign: "center",
    color: "white",
    textAlign: "center",
  },

  titlePrice: {
    width: "15%",
    color: "white",
    textAlign: "center",
  },

  buttonContainer: {
    flex: 0.2,
    //flexDirection: "column",
    //width: "100%",
    //height:"10%",
    textAlign: "center",
    marginBottom: 20,
    justifyContent: "space-around",
    //bottom:-90
    //backgroundColor: "#13182b",
  },

  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  textContainer: {
    flexDirection: "row",
  },

  totalLabel: {
    //width: "21%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
  },

  total: {
    //width: "45%",
    color: "white",
    textAlign: "left",
    fontSize: 30,
    paddingLeft: 5,
    marginTop: 10,
    marginRight: 10,
  },
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
