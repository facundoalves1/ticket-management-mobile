import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicForm from "../components/BasicForm";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLogin } from "../context/LoginProvider";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ModalPopUp from "../components/ModalPopUp";
import { POST_TICKET } from "../api/ticketApi";

export default function TicketScreen() {
  
  const [isClicked, setClicked] = useState([
    { key: "1", quantity: "1", name: "", price: "", barcode: "", internalcode:""},
  ]);
  const [total, setTotal] = useState("$0");
  const [visible, setVisible] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setLogedIn } = useLogin();
  const [isError, setError] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleChange = () => {
    if (isClicked.length >= 1) {
      let lastKey =  isClicked[isClicked.length - 1].key;
      let keyNumber = parseInt(lastKey) + 1;
      let newField = {
        key: keyNumber.toString(),
        quantity: "1",
        name: "",
        price: "",
        barcode: "",
        internalcode: ""
      };

      setClicked((items) => [...items, newField]);
    } else {
      let firstField = { key: "1", quantity: "1", name: "", price: "", barcode: "", internalcode:"" };
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
    console.log(data)
    setLoading(true);
    POST_TICKET(data)
      .then((res) => {
        setClicked([{ key: "1", quantity: "1", name: "", price: "", barcode: "", internalcode:"" }]);
        setTotal("$0");
        setLoading(false);
        setVisible(true);
      })
      .catch((err) => {
        const { message } = err.response.data;
        if (message == "PAYLOAD_DATA_NOT_FOUND") {
          AsyncStorage.removeItem("token");
          setLogedIn(null);
        }
        setClicked([{ key: "1", quantity: "1", name: "", price: "", barcode: "", internalcode:"" }]);
        setError(true);
        setVisible(true);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    const data = dataHandler();

    submitTicket(data);
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      setError(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleQuantity}>Cant.</Text>
        <Text style={styles.titleDescription}>Producto</Text>
        <Text style={styles.titlePrice}>Precio</Text>
        <Text style={{ width: "10%" }}></Text>
      </View>
      <BasicForm
        isClicked={isClicked}
        setClicked={setClicked}
        setTotal={setTotal}
      />
      <ModalPopUp visible={visible} onCancel={closeModal}>
        {isError ? (
          <ErrorModal message={"Error al guardar o imprimir ticket"} />
        ) : (
          <SuccessModal message={"Ticket guardado e impreso exitosamente"} />
        )}
      </ModalPopUp>
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
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
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
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
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
    textAlign: "center",
    marginBottom: 20,
    justifyContent: "space-around",
  },

  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  textContainer: {
    flexDirection: "row",
  },

  totalLabel: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
  },

  total: {
    color: "white",
    textAlign: "left",
    fontSize: 30,
    paddingLeft: 5,
    marginTop: 10,
    marginRight: 10,
  },
});
