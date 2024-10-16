import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../../styles/style";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";

export default function apresentArvore() {
  const router = useRouter();
  const { viva } = contarDiasSemFumar();
  async function ola (){
    router.push("/inicial");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#73AA9D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={[style.textoBemVindoDiv, { marginBottom: 30 }]}>
        <Text style={[style.textoBemVindo, { marginBottom: 20 }]}>
          Você tomou a melhor decisão da sua VIDA!
        </Text>
        <Text style={style.textoBemVindo}>
          Esta será a sua companheira para o resto de sua jornada, não fume que
          vocês dois terão uma saúde melhor!
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={[style.garotaOi, { marginBottom: 20 }]}
          source={require("../../assets/imgs/etapasArvore/etapa1.png")}
        />
      </View>

      <TouchableOpacity
        style={[style.buttonAvancar, { marginBottom: 60, width: 200 }]}
        onPress={ async () => {
          ola()
        }}
      >
        <Text style={style.buttonText}>Avançar</Text>
      </TouchableOpacity>

      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>
          DropVices{viva}
        </Text>
      </View>
    </View>
  );
}