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

export default function TicketCard({
  tickets,
  setTickets,
  item,
  expanded,
  onToggle,
}) {
  const [active, setActive] = useState(expanded);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setActive(expanded);
  }, [expanded]);

  const handleDelete = async () => {
    setLoading(true);
    await DELETE_TICKET(item._id)
      .then((res) => {
        const ticketsFiltered = tickets.filter(
          (ticket) => ticket._id !== item._id
        );
        setTickets(ticketsFiltered);
      })
    setLoading(false);
  };
  const handlePrint = async () => {
    setLoading(true);
    await PRINT_TICKET(item)
    setLoading(false);
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
                <TouchableOpacity
                  onPress={() => {
                    handlePrint();
                  }}
                >
                  <FontAwesome5 name="print" size={30} color="black" />
                </TouchableOpacity>
              </LinearGradient>
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
                <TouchableOpacity
                  onPress={() => {
                    handleDelete();
                  }}
                >
                  <FontAwesome5 name="trash-alt" size={30} color="black" />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          {isLoading && <LoadingSpinner isLoading={isLoading} />}
          {active ? <DetailTicketCard details={item.items} /> : null}
        </View>
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
