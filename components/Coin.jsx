import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Coin = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.containerText}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.textSymbol}>{item.symbol}</Text>
        </View>
      </View>
      <View style={styles.containerPrice}>
        <Text style={styles.textPrice}>${item.current_price}</Text>
        <Text
          style={[
            
            item.price_change_percentage_24h > 0
              ? styles.upPercentage
              : styles.downPercentage,
          ]}
        >
          {item.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    paddingTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor:"#434343",
    borderBottomWidth:2
  },
  container2: {
    flexDirection: "row",
  },
  containerText: {
    marginLeft: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: "#ffff",
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  containerPrice: {
    alignItems: "center",
  },
 
  upPercentage: {
    color: "green",
    textAlign:"right"
  },
  downPercentage: {
    color: "red",
    textAlign:"right"
  },
  textPrice:{
    textAlign:"right",
    color: "#ffff",
    
  }
});

export default Coin;
