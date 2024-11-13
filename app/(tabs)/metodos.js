import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import CompNavBar from "../../components/navbar"; // Certifique-se de ajustar o caminho corretamente

export default function Metodos() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Vontade de fumar?</Text>
          <Text style={styles.subtitle}>
            Escolha algum método que separamos para você e que irá ajudá-lo com
            isso. Lembre-se sempre de seus objetivos!
          </Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
      </View>
      <CompNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner ocupa toda a tela
  },
  content: {
    flex: 1, // O conteúdo ocupa o restante do espaço
    paddingBottom: 70, // Deixa espaço para a NavBar
    justifyContent: "center", // Centraliza o conteúdo
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontFamily: "LibreBaskerville-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Libre Baskerville",
    fontSize: 21,
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#73AA9D",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    fontFamily: "Libre Baskerville",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
});
