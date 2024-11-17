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
  const [valorTotalEconomizado, setValorTotalEconomizado] = useState(0);

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    return idapoiado;
  };

  const fetchValores = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4 || "http://localhost:3000";
      const idapoiado = await pegarIdApoiado();
      const response = await axios.get(ipv4 + "/usuarios/getValores", {
        params: { idapoiado },
      });
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

  useEffect(() => {
    if (diasSemFumar === null || diasSemFumar === undefined) return;

    if (tipoConsumo === "cigarro") {
      if (quantidadeMacos && valorMaco) {
        const valorDiario = quantidadeMacos * valorMaco;
        const totalEconomizado = valorDiario * diasSemFumar;
        setValorTotalEconomizado(totalEconomizado);
      } else {
        console.error(
          "Valores de 'quantidadeMacos' ou 'valorMaco' não definidos."
        );
      }
    } else if (tipoConsumo === "eletronico") {
      if (duracaoCigarroEletronico && valorCigarroEletronico) {
        let totalEconomizado = 0;

        if (diasSemFumar === 1) {
          // No primeiro dia, já adiciona o valor do cigarro eletrônico
          totalEconomizado = valorCigarroEletronico;
        } else {
          // Calcula o número de ciclos completos e dias restantes
          const ciclosCompletos = Math.floor(
            diasSemFumar / duracaoCigarroEletronico
          );
          const diasRestantes = diasSemFumar % duracaoCigarroEletronico;

          // Adiciona o valor dos ciclos completos
          totalEconomizado = ciclosCompletos * valorCigarroEletronico;

          // Adiciona o valor do primeiro ciclo (caso seja o primeiro dia ou diasRestantes > 0)
          if (diasRestantes > 0 || ciclosCompletos === 0) {
            totalEconomizado += valorCigarroEletronico;
          }
        }

        setValorTotalEconomizado(totalEconomizado);
      } else {
        console.error(
          "Valores de 'duracaoCigarroEletronico' ou 'valorCigarroEletronico' não definidos."
        );
      }
    }
  }, [
    tipoConsumo,
    quantidadeMacos,
    valorMaco,
    diasSemFumar,
    duracaoCigarroEletronico,
    valorCigarroEletronico,
  ]);

  return { valorTotalEconomizado };
}
