import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../../styles/style";
import CompTelaCarregamento from "../../components/telaCarregamento";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import contarDiasSemFumar from "./contarDiasSemFumar";

export default function valorEconomizado() {
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(null);
  const [valorMaco, setValorMaco] = useState(null);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(null);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] =
    useState(null);
  const { diasSemFumar } = contarDiasSemFumar();

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    console.log("idapoiadooooooooo: " + idapoiado);
    return idapoiado;
  };

  const fetchValores = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      const response = await axios.get(
        `http://${ipv4}:3000/usuarios/getValores`,
        {
          params: { idapoiado },
        }
      );
      setTipoConsumo(response.data.tipoConsumo);
      setQuantidadeMacos(response.data.quantidadeMacos);
      setValorMaco(response.data.valorMaco);
      setValorCigarroEletronico(response.data.valorCigarroEletronico);
      setDuracaoCigarroEletronico(response.data.duracaoCigarroEletronico);
    } catch (error) {
      console.error("Erro ao buscar os valores:", error);
    }
  };

  useEffect(() => {
    fetchValores();
  }, []);

  if (tipoConsumo === "cigarro") {
    const valorDiario = quantidadeMacos * valorMaco;
    console.log(valorDiario);
    const valorTotalEconomizado = valorDiario * diasSemFumar;
    console.log(valorTotalEconomizado);
    return valorTotalEconomizado;
  }else if (tipoConsumo === "eletronico"){
    //fazer com que o valorCigarroEletronico seja somado a cada vez que a duracaoCigarroEletronico caiba no diasSemFumar
  }

  return {
    valorTotalEconomizado
  };
}
