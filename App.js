import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Coin from "./components/Coin";

//Stylesheet estilos, TextInput para input, StatusBar es la barra del celu
const App = () => {
  const [coin, setCoin] = useState([]);
  console.log("monedas", coin);
  const [input, setInput] = useState("");
  console.log("input", input);
  const [refresh, setRefresh] = useState(false);

  const apiData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    // console.log("toda la info", data);
    setCoin(data);
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>JCrypto</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="SearchCoin"
          placeholderTextColor="#858585"
          onChangeText={(e) => setInput(e)} //capturo lo que se escribe en el input y lo guardo en mi estado
        />
      </View>
      <FlatList
        style={styles.flatList} //el Flatlsit actua como un map el flatlist, le agrego mi array en data y despues recorro
        data={
          coin.filter((e) =>
            e.name.toLowerCase().includes(input.toLowerCase())
          ) &&
          coin.filter((e) =>
            e.symbol.toLowerCase().includes(input.toLowerCase())
          )
        }
        renderItem={({ item }) => {
          return <Coin item={item} />; //envio el item a coin
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await apiData();
          setRefresh(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 38,
  },
  flatList: {
    width: "90%",
  },
  header: {
    marginTop: 45,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  searchBar: {
    color: "#fff",
    width: "40%",
    textAlign: "center",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
  },
});

export default App;
