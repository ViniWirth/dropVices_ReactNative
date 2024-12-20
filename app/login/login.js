import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Font from "expo-font";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import style from "../../styles/style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompLogin() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
          "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar fontes: ", error);
      }
    }
    loadFonts();

    // Verificação do AsyncStorage quando o componente for montado
    async function checkStorage() {
      const lastVisitTime = await AsyncStorage.getItem("lastVisitTime");
      if (lastVisitTime) {
        const formattedLastVisitTime = new Date(lastVisitTime).toLocaleString();
        console.log("Horário salvo no AsyncStorage:", formattedLastVisitTime);
      } else {
        console.log("Nenhum horário salvo no AsyncStorage.");
      }
    }

    checkStorage();
  }, []); // O array vazio garante que seja executado apenas uma vez, quando o componente for montado.

  async function handleLogin() {
    const data = {
      email,
      senha,
    };

    if (email == null || email === "" || senha == null || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const resposta = await axios.post(ipv4 + "/usuarios/login", data);

      console.log("Resposta: " + resposta.data.idapoiado);
      await AsyncStorage.setItem(
        "resposta",
        JSON.stringify(resposta.data.idapoiado)
      );

      // Verifica o tempo desde a última visita
      const lastVisitTime = await AsyncStorage.getItem("lastVisitTime");
      const now = new Date();

      if (!lastVisitTime) {
        // Primeira vez: salva o horário atual
        await AsyncStorage.setItem("lastVisitTime", now.toISOString());
        console.log("Primeiro acesso ou sem registro de última visita");
        router.push("/home"); // Redireciona diretamente para /home
        return;
      }

      const lastVisit = new Date(lastVisitTime); // Corrigido para calcular a diferença em horas
      const differenceInHours = (now - lastVisit) / (1000);//1000 * 60 * 60; // Diferença em horas
      if (differenceInHours > 10) {//20
        console.log("Mais de 20 horas");
        router.push("/fumou");
      } else {
        console.log("Menos de 20 horas");
        await AsyncStorage.setItem("lastVisitTime", now.toISOString()); // Atualiza o horário atual
        router.push("/home");
      }
    } catch (error) {
      alert(error.response?.data || "Erro ao fazer login");
      console.error(error);
    }
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <Link href={"/inicial"}>
          <Text
            style={[
              styles.headerText,
              fontsLoaded && { fontFamily: "LibreBaskerville-Regular" },
            ]}
          >
            <AntDesign name="left" size={34} color="white" />
            Login
          </Text>
        </Link>
      </View>
      <View style={style.container}>
        <TextInput
          style={style.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#888"
        />

        <TextInput
          style={style.input}
          onChangeText={setSenha}
          value={senha}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text
          style={[
            styles.footerText,
            fontsLoaded && { fontFamily: "LibreBaskerville-Bold" },
          ]}
        >
          DropVices
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#73AA9D",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 34,
    color: "white",
  },
  footerText: {
    color: "black",
    fontSize: 16,
  },
});
