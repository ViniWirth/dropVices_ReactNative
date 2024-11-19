import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import style from "../../styles/style";
import * as Font from "expo-font";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

export default function BemVindo() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const router = useRouter();
  const { email, senha } = useLocalSearchParams();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true); // Atualiza o estado quando as fontes forem carregadas
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>; // Exibe enquanto as fontes não estiverem carregadas
  }

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

    if (formattedText.length <= 2) {
      setDataNascimento(formattedText);
    } else if (formattedText.length <= 4) {
      setDataNascimento(`${formattedText.slice(0, 2)}/${formattedText.slice(2)}`);
    } else if (formattedText.length <= 8) {
      setDataNascimento(
        `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`
      );
    }

    // Converte para o formato YYYY-MM-DD
    if (formattedText.length === 8) {
      const day = formattedText.slice(0, 2);
      const month = formattedText.slice(2, 4);
      const year = formattedText.slice(4, 8);
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setDataNascimento(formattedDate);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text style={style.textoBemVindo}>Olá, bem-vindo(a)!</Text>
        <Text style={style.textoBemVindo}>
          Para começar, qual seu primeiro nome e data de nascimento?
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={style.garotaOi}
          source={require("../../assets/imgs/garotaOi.png")}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 50, marginTop: 30 }}>
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
        <Text style={{ fontFamily: "LibreBaskerville-Bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
