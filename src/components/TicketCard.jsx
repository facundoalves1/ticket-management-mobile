import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  formatDateShow,
  formatNumberWithCommas,
  formatTime,
} from "../utils/format";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DetailTicketCard from "./DetailTicketCard";
import { DELETE_TICKET, PRINT_TICKET } from "../api/ticketApi";
import LoadingSpinner from "./LoadingSpinner";
import ModalPopUp from "./ModalPopUp";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";

export default function TicketCard({
  tickets,
  setTickets,
  item,
  expanded,
  onToggle,
}) {
  const [active, setActive] = useState(expanded);
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setError] = useState(false);

  useEffect(() => {
    setActive(expanded);
  }, [expanded]);

  const handleDelete = async () => {
    setLoading(true);
    DELETE_TICKET(item._id)
      .then(() => {
        const ticketsFiltered = tickets.filter(
          (ticket) => ticket._id !== item._id
        );
        setModalMessage("Ticket eliminado exitosamente");
        setModalVisible(true);
        setLoading(false);
        setTimeout(() => {
          setTickets(ticketsFiltered);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setModalMessage("Error al eliminar el ticket");
        setModalVisible(true);
        setError(true);
      });
  };
  const handlePrint = async () => {
    setLoading(true);
    PRINT_TICKET(item)
      .then(() => {
        setModalMessage("Ticket impreso exitosamente");
        setModalVisible(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setModalMessage("Error al imprimir el ticket");
        setModalVisible(true);
        setError(true);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setError(false);
    }, 1000);
  };

  return (
    <>
      <TouchableOpacity onPress={() => onToggle(item.index)}>
        <View style={styles.itemCard}>
          <View style={styles.itemBox}>
            <View style={styles.itemData}>
              <Text style={styles.item}>
                Fecha: {formatDateShow(item.createdAt)}
              </Text>
              <Text style={styles.item}>
                Hora: {formatTime(item.createdAt)}
              </Text>
              <Text style={styles.item}>Artículos: {item.items.length}</Text>
              <Text style={styles.item}>
                Total: $ {formatNumberWithCommas(item.total)}
              </Text>
              <Text style={styles.item}>Creado por: {item.user.name}</Text>
            </View>
            <View style={styles.itemButton}>
              <TouchableOpacity
                onPress={() => {
                  handlePrint();
                }}
              >
                <LinearGradient
                  colors={["#E6C84F", "#E8807F"]}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 3,
                  }}
                >
                  <FontAwesome5 name="print" size={30} color="black" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDelete();
                }}
              >
                <LinearGradient
                  colors={["#E6C84F", "#E8807F"]}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 3,
                  }}
                >
                  <FontAwesome5 name="trash-alt" size={30} color="black" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading && <LoadingSpinner isLoading={isLoading} />}
          {active ? <DetailTicketCard details={item.items} /> : null}
        </View>
        <ModalPopUp visible={modalVisible} onCancel={closeModal}>
          {isError ? (
            <ErrorModal message={modalMessage} />
          ) : (
            <SuccessModal message={modalMessage} />
          )}
        </ModalPopUp>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6C84F",
    paddingVertical: 8,
    marginVertical: 4,
  },
  itemBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemData: {
    display: "flex",
    flexDirection: "column",
  },
  itemButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    color: "white",
  },
});
