//COMPONENTE PARA TELA DE CARREGAMENTO

import React from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import style from "../styles/style";

export default function CompTelaCarregamento() {
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
          fontFamily: "Libre Baskerville",
          fontWeight: "bold",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        DropVices
      </Text>
    </View>
  );
}
