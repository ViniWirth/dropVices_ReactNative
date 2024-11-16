import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import style from "../../styles/style";
import axios from "axios";
import * as Font from "expo-font";

export default function cigEletronico() {
  Font.loadAsync({
    "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
    "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
  });
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState("");
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState("");

  const { email, senha, nome, dataNascimento, tipoConsumo } =
    useLocalSearchParams();
  const router = useRouter();

  function inserirDadosConvencional() {
    // As variáveis valorCigarroEletronico e duracaoCigarroEletronico já estão formatadas
    const dados = {
      email,
      senha,
      nome,
      dataNascimento,
      tipoConsumo,
      valorCigarroEletronico,
      duracaoCigarroEletronico,
    };

    console.log(dados);

    if (
      valorCigarroEletronico == null ||
      valorCigarroEletronico === "" ||
      duracaoCigarroEletronico == null ||
      duracaoCigarroEletronico === ""
    ) {
      alert(
        "Preencha todos os campos! Caso não saiba, coloque uma média aproximada."
      );
    } else {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      axios.post(
        ipv4+"/usuarios/inserirDadosConvencional",
        dados
      );
      router.push("registro/motivo");
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
          onChangeText={(text) =>
            setValorCigarroEletronico(text.replace(",", "."))
          }
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
          onChangeText={(text) =>
            setDuracaoCigarroEletronico(text.replace(",", "."))
          }
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
          onPress={inserirDadosConvencional}
        >
          <Text style={style.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "LibreBaskerville-Bold"}}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
