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

export default function contarDiasSemFumar() {
  const [ultimoDiaQueFumou, setUltimoDiaQueFumou] = useState(null);
  const [diasSemFumar, setDiasSemFumar] = useState(null);

  useEffect(() => {
    const fetchUltimoDiaQueFumou = async () => {
      try {
        const ipv4 = process.env.EXPO_PUBLIC_IPV4;
        const response = await axios.get(
          `http://${ipv4}:3000/usuarios/ultimoDiaQueFumou`,
          {
            params: { email: "data@gmail.com" }, // Substitua pelo email do usuário
          }
        );
        setUltimoDiaQueFumou(response.data.ultimoDiaQueFumou);
      } catch (error) {
        console.error("Erro ao buscar o último dia que fumou:", error);
      }
    };

    fetchUltimoDiaQueFumou();
  }, []);

  useEffect(() => {
    if (ultimoDiaQueFumou) {
      const calcularDiasSemFumar = () => {
        const dataAtual = new Date();
        const dataUltimoDiaQueFumou = new Date(ultimoDiaQueFumou);
        const diferencaTempo = dataAtual - dataUltimoDiaQueFumou;
        const diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
        setDiasSemFumar(diferencaDias);
      };

      calcularDiasSemFumar();
    }
  }, [ultimoDiaQueFumou]);

  return (
    <View style={style.container}>
      <Text style={style.texto}>
        {diasSemFumar !== null
          ? `Você está sem fumar há ${diasSemFumar} dias!`
          : "Carregando..."}
      </Text>
    </View>
  );
}
