//COMPONENTE PARA TELA DE CARREGAMENTO

import React from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import style from "../styles/style";
import * as Font from "expo-font";

export default function CompTelaCarregamento() {
  Font.loadAsync({
    "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
    "LondrinaSolid-Black": require("../assets/fonts/LondrinaSolid-Black.ttf"),
    "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
  });
  return (
    <View style={style.testeTop}>
      <Image
        style={style.logoCarregamento}
        source={require("../assets/imgs/logoDropVices.png")}
      />
      <Text
        style={{
          fontSize: 30,
          color: "#fff",
          fontFamily: "LibreBaskerville-Bold",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        DropVices
      </Text>
    </View>
  );
}
