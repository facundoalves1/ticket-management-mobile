import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatNumberWithCommas } from "../utils/format";

export default function DetailTicketCard({ details }) {
  return (
    <View style={styles.containerDetails}>
      <View style={styles.details}>
                <Text style={styles.detailTextCenter}>Nº</Text>
                <Text style={styles.detailText}>Producto</Text>
                <Text style={styles.detailText}>Cantidad</Text>
                <Text style={styles.detailText}>Monto</Text>
              </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={details}
          renderItem={({ item }) => (
            <>
              <View style={styles.details}>
                <Text style={styles.detailTextCenter}>{item.id}</Text>
                <Text style={styles.detailText}>{item.name}</Text>
                <Text style={styles.detailText}>{item.quantity} x $ {formatNumberWithCommas(item.price)}</Text>
                <Text style={styles.detailText}>$ {formatNumberWithCommas(item.price * item.quantity)}</Text>
              </View>
            </>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  containerDetails: {
    marginVertical: 10,
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  detailText: {
    alignItems: 'flex-start',
    color: 'white',
    width: '28%'
  },
  detailTextCenter: {
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    width: '16%'
  }
});
