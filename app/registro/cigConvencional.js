import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Font from "expo-font";
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
  const [fontLoaded, setFontLoaded] = useState(false);
  const [quantidadeMacos, setQuantidadeMacos] = useState("");
  const [valorMaco, setValorMaco] = useState("");

  const { email, senha, nome, dataNascimento, tipoConsumo } = useLocalSearchParams();
  const router = useRouter();

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

  const inserirDadosConvencional = () => {
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

    if (!quantidadeMacos || !valorMaco) {
      alert("Preencha todos os campos! Caso não saiba, coloque uma média aproximada.");
    } else {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      // Envia os dados via API
      axios.post(`${ipv4}/usuarios/inserirDadosConvencional`, dados);
      router.push("registro/motivo");
    }
  };

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
        <Text style={{ fontFamily: "LibreBaskerville-Bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
