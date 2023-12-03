import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tickets } from "../utils/fakeTicket";
import TicketCard from "../components/TicketCard";

export default function HistoryScreen() {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const toggleDetailCard = (index) => {
    setExpandedCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Historial de Tickets</Text>
        <FlatList
          keyExtractor={(item) => item._id.$oid}
          data={tickets}
           renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => toggleDetailCard(index)}>
      <TicketCard item={item} expanded={index === expandedCardIndex} onToggle={() => toggleDetailCard(index)} />
    </TouchableOpacity>
  )}
        />
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
