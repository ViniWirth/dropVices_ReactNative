import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import * as Font from "expo-font";
import style from "../../styles/style";

export default function Motivo() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true); // Atualiza o estado quando as fontes são carregadas
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>; // Exibe enquanto as fontes não estiverem carregadas
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "LibreBaskerville-Regular",
            textAlign: "center",
          }}
        >
          Qual o principal motivo que o levou a parar de fumar? Reflita bem!
        </Text>
      </View>

      <View style={style.container}>
        {["Minha saúde", "Meu bem-estar", "Ciclo social", "Economizar dinheiro", "Aparência", "Fertilidade"].map((motivo, index) => (
          <Link href="registro/apresentArvore" asChild key={index}>
            <TouchableOpacity style={styles.buttonMotivo}>
              <Text style={styles.buttonTextMotivo}>{motivo}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "LibreBaskerville-Bold" }}>DropVices</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMotivo: {
    width: "60%",
    height: 60,
    backgroundColor: "#66A394",
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextMotivo: {
    color: "white",
    fontSize: 25,
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
  },
});
