import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import style from "../../styles/style";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

export default function BemVindo() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const router = useRouter();
  const { email, senha } = useLocalSearchParams();

  const handleBemVindo = () => {
    if (!nome || !dataNascimento) {
      alert("Preencha todos os campos!");
    } else {
      router.push({
        pathname: "registro/tipoConsumo",
        params: { email, senha, nome, dataNascimento },
      });
    }
  };

  const handleDateChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, "");

    let newDateNascimento;
    if (formattedText.length <= 2) {
      newDateNascimento = formattedText;
    } else if (formattedText.length <= 4) {
      newDateNascimento = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    } else {
      newDateNascimento = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
    }

    // Atualiza a data no formato DD/MM/YYYY
    setDataNascimento(newDateNascimento);
    // Converter para o formato YYYY-MM-DD
    if (formattedText.length === 8) {
      const day = formattedText.slice(0, 2);
      const month = formattedText.slice(2, 4);
      const year = formattedText.slice(4, 8);
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setDataNascimento(formattedDate);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text style={style.textoBemVindo}>Olá, bem-vindo(a)!</Text>
        <Text style={style.textoBemVindo}>
          Para começar, qual seu nome e data de nascimento?
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
        <Text style={{ fontFamily: "LibreBaskerville-Bold"}}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
