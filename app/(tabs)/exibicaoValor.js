import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import valorEconomizado from "../functions/valorEconomizado";
import CompNavBar from "../../components/navbar"; // Certifique-se de ajustar o caminho corretamente

export default function ExibicaoValor() {
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(0);
  const [valorMaco, setValorMaco] = useState(0);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(0);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState(0);
  const { valorTotalEconomizado } = valorEconomizado();

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

  const [textoValorMedio, setTextoValorMedio] = useState("Valor médio do maço:");
  const [valorMedio, setValorMedio] = useState(`R$${valorMaco}`);
  const [textoUtilizadosDuracao, setTextoUtilizadosDuracao] = useState("Maços utilizados:");
  const [utilizadosDuracao, setUtilizadosDuracao] = useState(quantidadeMacos);

  useEffect(() => {
    if (tipoConsumo === "eletronico") {
      setTextoValorMedio("Valor médio do cigarro eletrônico:");
      setValorMedio(`R$${valorCigarroEletronico}`);
      setTextoUtilizadosDuracao("Duração:");
      setUtilizadosDuracao(`${duracaoCigarroEletronico} dias`);
    } else {
      setTextoValorMedio("Valor médio do maço:");
      setValorMedio(`R$${valorMaco}`);
      setTextoUtilizadosDuracao("Maços utilizados:");
      setUtilizadosDuracao(`${quantidadeMacos} maços`);
    }
  }, [tipoConsumo, valorMaco, valorCigarroEletronico, quantidadeMacos, duracaoCigarroEletronico]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Quanto você deixou de gastar com seu esforço?
        </Text>
        <Text style={styles.subTitle}>{textoValorMedio}</Text>
        <Text style={styles.value}>{valorMedio}</Text>
        <Text style={styles.subTitle}>{textoUtilizadosDuracao}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{utilizadosDuracao}</Text>
        </View>
        {tipoConsumo === "cigarro" && (
          <View style={styles.perDay}>
            <Text style={styles.perDayText}>por dia</Text>
          </View>
        )}
        <Text style={styles.title}>Valor total economizado:</Text>
        <Text style={styles.totalValue}>R${valorTotalEconomizado}</Text>
      </View>
      <CompNavBar /> {/* A NavBar ficará fixa na parte inferior da tela */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner ocupa toda a tela
  },
  content: {
    flex: 1, // O conteúdo ocupa o restante do espaço
    paddingBottom: 70, // Adiciona espaço para a NavBar
    marginTop: "-12%",
    justifyContent: "center", // Centraliza o conteúdo
  },
  title: {
    fontFamily: "Libre Baskerville",
    fontSize: 32,
    textAlign: "center",
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  subTitle: {
    fontFamily: "Libre Baskerville",
    fontSize: 24,
    textAlign: "center",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  value: {
    fontFamily: "Libre Baskerville",
    fontSize: 80,
    textAlign: "center",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    color: "#73AA9D",
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
  },
  valueText: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 80,
    color: "#73AA9D",
    fontWeight: "bold",
  },
  perDay: {
    alignItems: "center",
  },
  perDayText: {
    fontFamily: "LibreBaskerville-Bold",
    fontWeight: "bold",
    fontSize: 28,
    color: "#73AA9D",
    marginLeft: 5,
  },
  totalValue: {
    fontFamily: "LibreBaskerville-Bold",
    fontWeight: "bold",
    color: "#73AA9D",
    fontSize: 100,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
