import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import style from "../../styles/style";
import axios from "axios";

export default function cigEletronico() {
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState("");
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState("");

  const { email, senha, nome, dataNascimento, tipoConsumo } = useLocalSearchParams();
  const router = useRouter();

  function inserirDadosEletronico() {
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
      axios.post(
        "http://192.168.2.190:3000/usuarios/inserirDadosEletronico",
        dados
      );
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
          onPress={inserirDadosEletronico}
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
