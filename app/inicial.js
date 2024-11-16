import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Font from "expo-font";
import style from "../styles/style";

export default function Inicial() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
          "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar fontes: ", error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#73AA9D", flex: 1 }}>
      <View style={style.logoCima}>
        <Image
          style={style.logoCarregamento}
          source={require("../assets/imgs/logoDropVices.png")}
        />
        <Text
          style={[
            styles.text,
            fontsLoaded && { fontFamily: "LibreBaskerville-Regular" },
          ]}
        >
          DropVices
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 150,
        }}
      >
        <Link href="/login/login" asChild>
          <TouchableOpacity style={style.button}>
            <Text style={style.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>
        <Text
          style={[
            styles.text,
            { fontSize: 18, marginTop: 20 },
            fontsLoaded && { fontFamily: "LibreBaskerville-Regular" },
          ]}
        >
          Não tem uma conta?{" "}
          <Link
            href="registro/registro"
            style={{ textDecorationLine: "underline" }}
          >
            Cadastre-se
          </Link>
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
  text: {
    color: "#fff",
    fontSize: 40,
  },
});
