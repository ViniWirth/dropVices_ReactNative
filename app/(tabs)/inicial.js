//COMPONENTE PARA TELA DE CARREGAMENTO
import { Link } from "expo-router";
import React from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import style from "../../styles/style";

export default function inicial() {

  return (
    <View style={{ backgroundColor: "#73AA9D", flex: 1 }}>
      <View style={style.logoCima}>
        <Image
          style={style.logoCarregamento}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text
          style={{
            fontSize: 40,
            color: "#fff",
            fontFamily: "Libre Baskerville",
            fontWeight: "bold",
            marginTop: 3,
          }}
        >
          DropVices
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 150,
        }}
      >
        <Link href="/login" asChild>
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>
        <Text
          style={{
            color: "white",
            fontFamily: "Libre Baskerville",
            fontSize: 18,
            marginTop: 20,
          }}
        >
          Não tem uma conta? <Link href="/registro">Cadastre-se</Link>
        </Text>
      </View>
    </View>
  );
}
