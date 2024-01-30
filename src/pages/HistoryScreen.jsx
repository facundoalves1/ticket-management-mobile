import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TicketCard from "../components/TicketCard";
import { GET_TICKETS_BY_USERS } from "../api/ticketApi";
import { useFocusEffect } from "@react-navigation/core";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function HistoryScreen({ navigation }) {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isError, setError] = useState(false);
  const { setLogedIn } = useLogin()
  const toggleDetailCard = (index) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const timeOptions = [
    { label: "Hoy", value: 1 },
    { label: "Semana", value: 2 },
    { label: "Mes", value: 3 },
    { label: "Todo", value: 4 },
  ]

  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleFilterTime = (periodity) => {
    const currentDate = new Date();
    let filteredTickets = [];

    switch (periodity) {
      case 1:
        filteredTickets = tickets.filter(ticket => {
          const ticketDate = new Date(ticket.createdAt);
          const ticketDateFormatted = new Date(ticketDate.getFullYear(), ticketDate.getMonth(), ticketDate.getDate());
          const currentDateFormatted = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
          return ticketDateFormatted.getTime() === currentDateFormatted.getTime();
        });
        break;
      case 2:
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const lastDayOfWeek = new Date(currentDate);
        lastDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 6);

        filteredTickets = tickets.filter(ticket => {
          const ticketDate = new Date(ticket.createdAt);
          return ticketDate >= firstDayOfWeek && ticketDate <= lastDayOfWeek;
        });
        break;
      case 3:
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        filteredTickets = tickets.filter(ticket => {
          const ticketDate = new Date(ticket.createdAt);
          return ticketDate >= firstDayOfMonth && ticketDate <= lastDayOfMonth;
        });
        break;
      case 4:
        filteredTickets = tickets;
        break;
      default:
        break;
    }
    setFilteredTickets(filteredTickets);
    setExpandedCardIndex(null);
  };

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);


  useFocusEffect(
    useCallback(() => {
      GET_TICKETS_BY_USERS().then((res) => {
        if (res.length > 0) {
          res.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
          });
          setTickets(res)
        }
      })
        .catch(err => {
          const { message } = err.response.data;
          if (message == "PAYLOAD_DATA_NOT_FOUND") {
            AsyncStorage.removeItem("token");
            setLogedIn(null);
          }
        });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Historial de Tickets</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 5

          }}
        >
          {timeOptions.map(option => {
            return (
              <TouchableOpacity
                onPress={() => handleFilterTime(option.value)}
                key={option.label}
              >
                <LinearGradient
                  colors={["#E6C84F", "#E8807F"]}
                  style={{
                    height: 50,
                    width: 90,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 3,
                  }}
                >
                  <Text>
                    {option.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )
          })}
        </View>
        {tickets.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item._id}
            data={filteredTickets}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => toggleDetailCard(index)}>
                <TicketCard
                  item={item}
                  tickets={tickets}
                  setTickets={setTickets}
                  expanded={index === expandedCardIndex}
                  onToggle={() => toggleDetailCard(index)}
                  setVisible={setVisible}
                  setError={setError}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={{ ...styles.item, textAlign: 'center' }}>No hay tickets creados</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13182b",
    color: "black",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center",
  },
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
