import React, { useState, useEffect } from "react";
import style from "../styles/style";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Fumou() {
  const [nome, setNome] = useState(null);

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    return idapoiado;
  };

  const fetchValores = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      const response = await axios.get(`${ipv4}/usuarios/getValores`, {
        params: { idapoiado },
      });
      setNome(response.data.nome);
    } catch (error) {
      console.error("Erro ao buscar os valores:", error);
    }
  };

  useEffect(() => {
    fetchValores();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "Libre Baskerville",
            textAlign: "center",
            marginLeft: 40,
            marginRight: 40,
            marginTop: 25,
          }}
        >
          Olá, bem-vindo(a), {nome}!
        </Text>
        <Text
          style={{
            marginTop: 80,
            color: "#fff",
            fontSize: 30,
            fontFamily: "Libre Baskerville",
            textAlign: "center",
            marginLeft: 40,
            marginRight: 40,
          }}
        >
          Você está livre de nicotina hoje?
        </Text>
      </View>
      <View
        style={{
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
          marginTop: 90,
          marginBottom: 150,
        }}
      >
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={require("../assets/imgs/sim.jpg")}
        />
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={require("../assets/imgs/nao.jpg")}
        />
      </View>

      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
