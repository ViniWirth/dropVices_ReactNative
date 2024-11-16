import React, { useState, useEffect } from "react";
import style from "../styles/style";
import { Link, useRouter } from "expo-router";
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
import * as Font from "expo-font";

export default function Fumou() {
  const [nome, setNome] = useState(null);
  const [lastVisitTime, setLastVisitTime] = useState(null);
  const router = useRouter();

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
    const fetchLastVisitTime = async () => {
      const savedLastVisitTime = await AsyncStorage.getItem("lastVisitTime");
      setLastVisitTime(
        savedLastVisitTime ? new Date(savedLastVisitTime) : null
      );
    };
    fetchLastVisitTime();
  }, []);

  const updateLastVisitTime = async (isFree) => {
    const now = new Date();
    await AsyncStorage.setItem("lastVisitTime", now.toISOString());

    if (isFree) {
      console.log("Usuário está livre de nicotina, redirecionando...");
      router.push("/home");
    } else {
      console.log("Usuário fumou, redirecionando...");
      await atualizarUltimoDiaQueFumou();
      router.push("/home");
    }
  };

  const atualizarUltimoDiaQueFumou = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      await axios.post(`${ipv4}/usuarios/atualizarUltimoDiaQueFumou`, { idapoiado });
      console.log("Último dia que fumou atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o último dia que fumou:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "LibreBaskerville-Regular",
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
            fontFamily: "LibreBaskerville-Regular",
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
        <TouchableOpacity onPress={() => updateLastVisitTime(true)}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={require("../assets/imgs/sim.jpg")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateLastVisitTime(false)}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={require("../assets/imgs/nao.jpg")}
          />
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "LibreBaskerville-Bold" }}>DropVices</Text>
      </View>
    </View>
  );
}