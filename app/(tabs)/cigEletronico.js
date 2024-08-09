import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import style from "../../styles/style";

export default function cigEletronico() {
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState("");
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState("");

  const router = useRouter();

  function handleCigConvencional() {
    const valorCigarroEletronicoFormatado = valorCigarroEletronico.replace(
      ",",
      "."
    );
    const duracaoCigarroEletronicoFormatado = duracaoCigarroEletronico.replace(
      ",",
      "."
    );

    const data = {
      valorCigarroEletronico: valorCigarroEletronicoFormatado,
      duracaoCigarroEletronico: duracaoCigarroEletronicoFormatado,
    };
    console.log(data);

    if (
      valorCigarroEletronicoFormatado == null ||
      valorCigarroEletronicoFormatado == "" ||
      duracaoCigarroEletronicoFormatado == null ||
      duracaoCigarroEletronicoFormatado == ""
    ) {
      alert(
        "Preencha todos os campos! Caso não saiba, coloque uma média aproximada."
      );
    } else {
      router.push("/motivo");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#73AA9D",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Text style={style.textoQuant}>
          Insira abaixo, em média, quanto você paga em um cigarro eletrônico:
        </Text>
        <TextInput
          style={style.input}
          placeholder="Ex: 150"
          keyboardType="numeric"
          onChangeText={(text) => setValorCigarroEletronico(text.replace(",", "."))}
          value={valorCigarroEletronico}
          placeholderTextColor="#888"
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={style.textoQuant}>
          Quanto dias costumava durar seu cigarro eletrônico?
        </Text>
        <TextInput
          style={style.input}
          placeholder="Ex: 30"
          keyboardType="numeric"
          onChangeText={(text) => setDuracaoCigarroEletronico(text.replace(",", "."))}
          value={duracaoCigarroEletronico}
          placeholderTextColor="#888"
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 40,
          marginBottom: 50,
        }}
      >
        <TouchableOpacity
          style={style.buttonAvancar}
          onPress={handleCigConvencional}
        >
          <Text style={style.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
