import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import valorEconomizado from "../functions/valorEconomizado";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

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

  const [textoValorMedio, setTextoValorMedio] = useState(
    "Valor médio do maço:"
  );
  const [valorMedio, setValorMedio] = useState(`R$${valorMaco}`);
  const [textoUtilizadosDuracao, setTextoUtilizadosDuracao] =
    useState("Maços utilizados:");
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
  }, [
    tipoConsumo,
    valorMaco,
    valorCigarroEletronico,
    quantidadeMacos,
    duracaoCigarroEletronico,
  ]);

  return (
    <View style={{marginTop:"5%"}}>
      <Link href={"/home"}>
        <Text style={{ fontSize: 34, fontFamily: "Libre Baskerville",}}>
          <AntDesign name="left" size={34} color="black" />
          Voltar
        </Text>
      </Link>
      <View>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 32,
            textAlign: "center",
            marginTop: 50,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Quanto você deixou de gastar com seu esforço?
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 24,
            textAlign: "center",
            marginTop: 50,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {textoValorMedio}
        </Text>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 80,
            textAlign: "center",
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            color: "#73AA9D",
            fontWeight: "bold",
          }}
        >
          {valorMedio}
        </Text>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 24,
            textAlign: "center",
            marginTop: 50,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {textoUtilizadosDuracao}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "LibreBaskerville-Bold",
              fontSize: 80,
              color: "#73AA9D",
              fontWeight: "bold",
            }}
          >
            {utilizadosDuracao}
          </Text>
        </View>
        {tipoConsumo === "cigarro" && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "LibreBaskerville-Bold",
                fontWeight: "bold",
                fontSize: 28,
                color: "#73AA9D",
                marginLeft: 5,
              }}
            >
              por dia
            </Text>
          </View>
        )}
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 32,
            textAlign: "center",
            marginTop: 50,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Valor total economizado:
        </Text>
        <Text
          style={{
            fontFamily: "LibreBaskerville-Bold",
            fontWeight: "bold",
            color: "#73AA9D",
            fontSize: 100,
            textAlign: "center",
            marginTop: 40,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          R${valorTotalEconomizado}
        </Text>
      </View>
    </View>
  );
}
