import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function contarDiasSemFumar() {
  const [ultimoDiaQueFumou, setUltimoDiaQueFumou] = useState("");
  const [diasSemFumar, setDiasSemFumar] = useState(0); // Inicia como número

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    return idapoiado;
  };

  const fetchUltimoDiaQueFumou = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      const response = await axios.get(
        ipv4+"/usuarios/getUltimoDiaQueFumou",
        {
          params: { idapoiado },
        }
      );
      setUltimoDiaQueFumou(response.data.ultimoDiaQueFumou);
    } catch (error) {
      console.error("Erro ao buscar o último dia que fumou:", error);
    }
  };

  useEffect(() => {
    fetchUltimoDiaQueFumou();
  }, []);

  useEffect(() => {
    if (ultimoDiaQueFumou) {
      const calcularDiasSemFumar = () => {
        const dataAtual = new Date();
        const dataUltimoDiaQueFumou = new Date(ultimoDiaQueFumou);
        const diferencaTempo = dataAtual - dataUltimoDiaQueFumou;
        const diferencaDias = Math.floor(
          diferencaTempo / (1000 * 60 * 60 * 24)
        );
        setDiasSemFumar(diferencaDias); // Armazena como número
      };

      calcularDiasSemFumar();
    }
  }, [ultimoDiaQueFumou]);

  return { ultimoDiaQueFumou, diasSemFumar };
}
