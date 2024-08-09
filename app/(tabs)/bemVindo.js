import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../../styles/style";

export default function bemVindo() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const router = useRouter();

  function handleBemVindo() {
    const data = {
      nome,
      dataNascimento,
    };
    console.log(data);
    if (
      nome == null ||
      nome == "" ||
      dataNascimento == null ||
      dataNascimento == ""
    ) {
      alert("Preencha todos os campos!");
    } else {
      router.push("/tipoConsumo");
    }
  }

  const handleDateChange = (text) => {
    // Remove caracteres não numéricos
    const formattedText = text.replace(/[^0-9]/g, "");

    //FORMATAÇÃO
    if (formattedText.length <= 2) {
      setDataNascimento(formattedText);
    } else if (formattedText.length <= 4) {
      setDataNascimento(
        `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`
      );
    } else {
      setDataNascimento(
        `${formattedText.slice(0, 2)}/${formattedText.slice(
          2,
          4
        )}/${formattedText.slice(4, 8)}`
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text style={style.textoBemVindo}>Olá, bem vindo(a)!</Text>
        <Text style={style.textoBemVindo}>
          Para começar, qual seu nome e data de nascimento?
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={style.garotaOi}
          source={require("../../assets/imgs/garotaOi.png")}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 20,
        }}
      >
        <TextInput
          style={style.input}
          onChangeText={setNome}
          value={nome}
          placeholder="Nome"
          placeholderTextColor="#888"
        />

        <TextInput
          style={style.input}
          onChangeText={handleDateChange}
          value={dataNascimento}
          placeholder="Data de nascimento"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={10}
        />

        <TouchableOpacity style={style.buttonAvancar} onPress={handleBemVindo}>
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
