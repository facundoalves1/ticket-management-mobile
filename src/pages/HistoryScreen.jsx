import React, { useEffect, useState, useCallback } from "react";
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

export default function HistoryScreen({ navigation }) {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [tickets, setTickets] = useState([]);
  const toggleDetailCard = (index) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useFocusEffect(
    React.useCallback(() => {
      GET_TICKETS_BY_USERS().then((res) => setTickets(res));
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1}}>
        <Text style={styles.title}>Historial de Tickets</Text>
        {tickets.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item._id}
            data={tickets}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => toggleDetailCard(index)}>
                <TicketCard
                  item={item}
                  tickets={tickets}
                  setTickets={setTickets}
                  expanded={index === expandedCardIndex}
                  onToggle={() => toggleDetailCard(index)}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.item}>No hay tickets creados</Text>
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
