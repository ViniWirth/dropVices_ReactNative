import React from "react";
import { useRouter } from "expo-router"; // Importa o hook useRouter
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function CompNavBar() {
  const router = useRouter(); // Cria uma instância do router

  // Função para navegação
  const handleNavigation = (page) => {
    router.push(page); // Navega para a página indicada
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => handleNavigation("/exibicaoValor")}>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/buttonValores.jpg")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("/home")}>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/logoDropVices.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation("/metodos")}>
        <Image
          style={styles.iconNavBar}
          source={require("../assets/imgs/buttonMetodos.jpg")}
        />
      </TouchableOpacity>
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
