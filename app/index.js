import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import CompTelaCarregamento from "../components/telaCarregamento";
import { Image } from "react-native";

export default function Index() {
  const router = useRouter();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
      "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
    }).then(() => setFontLoaded(true));

    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000); //3000

    return () => clearTimeout(timer);
  }, []);

  if (!fontLoaded) {
    return <CompTelaCarregamento />; // Tela de carregamento enquanto a fonte é carregada
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#73AA9D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CompTelaCarregamento />
    </View>
  );
}
