import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import style from "../../styles/style";
import valorEconomizado from "../functions/valorEconomizado";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function apresentArvore() {
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(null);
  const [valorMaco, setValorMaco] = useState(null);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(null);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] =
    useState(null);
  const { valorTotalEconomizado } = valorEconomizado();

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    return idapoiado;
  };

  const fetchValores = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
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

  





  return (
    <View>
      <Text>voltar</Text>
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

      </View>
    </View>
  );
}
