//COMPONENTE PARA NAVBAR

import React from "react";
import { Link } from "expo-router";
import { View, StyleSheet, Image } from "react-native";

export default function CompNavBar() {
  return (
    <View style={styles.navBar}>
      <Link href="/exibicaoValor" asChild>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/buttonValores.jpg")}
        />
      </Link>
      <Link href="/home" asChild>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/logoDropVices.png")}
        />
      </Link>
      <Link href="/metodos" asChild>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/buttonMetodos.jpg")}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#73AA9D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 90,
    position: "absolute",
    bottom: 0,
    width: "100%", // Certifique-se de que ocupa toda a largura
  },
  iconNavBar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
