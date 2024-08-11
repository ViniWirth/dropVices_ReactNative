import React, { useState } from "react";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import style from "../../styles/style";
import axios from "axios";  

export default function cigConvencional() {
  const [quantidadeMacos, setQuantidadeMacos] = useState("");
  const [valorMaco, setValorMaco] = useState("");

  const { email, senha, nome, dataNascimento, tipoConsumo } = useLocalSearchParams();
  const router = useRouter();

  function inserirDadosConvencional() {
    
    const dados = {
      email,
      senha,
      nome,
      dataNascimento,
      tipoConsumo,
      quantidadeMacos,
      valorMaco,
    };

    console.log(dados);

    if (
      quantidadeMacos === "" ||
      quantidadeMacos == null ||
      valorMaco === "" ||
      valorMaco == null
    ) {
      alert(
        "Preencha todos os campos! Caso não saiba, coloque uma média aproximada."
      );
    } else {
      axios.post(
        "http://192.168.2.190:3000/usuarios/inserirDadosConvencional",
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
          Quantos maços de cigarros você fuma por dia, em média?
        </Text>
        <TextInput
          style={style.input}
          placeholder="Ex: 1,5"
          keyboardType="numeric"
          onChangeText={(text) => setQuantidadeMacos(text.replace(",", "."))}
          value={quantidadeMacos}
          placeholderTextColor="#888"
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={style.textoQuant}>
          Quantos reais aproximadamente você paga em um maço de cigarro?
        </Text>
        <TextInput
          style={style.input}
          placeholder="Ex: 7,50"
          keyboardType="numeric"
          onChangeText={(text) => setValorMaco(text.replace(",", "."))}
          value={valorMaco}
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
        <Text style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
