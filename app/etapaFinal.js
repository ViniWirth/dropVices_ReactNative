import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../styles/style";
import * as Font from "expo-font";

export default function etapaFinal() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LondrinaSolid-Black": require("../assets/fonts/LondrinaSolid-Black.ttf"),
        "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleContinue = () => {
    router.push("/home");
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#73AA9D" }}>
        <Text style={{ fontSize: 18, color: "white" }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 55 }}>
        <Image
          source={require("../assets/imgs/etapasArvore/arvoreFinal.png")}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text
          style={{
            fontFamily: "LibreBaskerville-Regular",
            fontSize: 24,
            color: "white",
            backgroundColor: "#73AA9D",
            padding: 10,
            borderRadius: 15,
            textAlign: "center",
            position: "absolute",
            zIndex: 1,
          }}
        >
          Parabéns! Você conseguiu!
        </Text>
        <Text
          style={{
            ...style.textoEmCaixa,
            fontSize: 18,
            fontFamily: "LibreBaskerville-Regular",
            marginLeft: 50,
            marginRight: 50,
            marginTop: 45,
          }}
        >
          Você concluiu seu objetivo de 2 meses sem fumar! Não há mais resíduos
          de nicotina no seu corpo. Você está cada vez mais saudável e mais
          próximo da sua nova vida! Continue assim!
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#73AA9D", borderRadius: 15 }}
          onPress={handleContinue}
        >
          <Text
            style={{
              fontFamily: "LibreBaskerville-Regular",
              padding: 20,
              fontSize: 20,
              color: "#fff",
            }}
          >
            Continue!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
