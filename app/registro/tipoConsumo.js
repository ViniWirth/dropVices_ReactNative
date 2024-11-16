import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import style from "../../styles/style";
import * as Font from "expo-font";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

export default function TipoConsumo() {
  Font.loadAsync({
    "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
    "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
  });
  const [tipoConsumo, setTipoConsumo] = useState("");
  const [navigate, setNavigate] = useState(false);

  const { email, senha, nome, dataNascimento } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (navigate) {
      router.push({
        pathname:
          tipoConsumo === "cigarro"
            ? "registro/cigConvencional"
            : "registro/cigEletronico",
        params: { email, senha, nome, dataNascimento, tipoConsumo },
      });
      setNavigate(false);
    }
  }, [navigate]);

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
          De onde vem o seu consumo de nicotina?
        </Text>
      </View>

      <View style={style.container}>
        <TouchableOpacity
          style={styles.buttonTipoConsumo}
          onPress={() => {
            setTipoConsumo("cigarro");
            setNavigate(true);
          }}
        >
          <Text style={styles.buttonTextTipoConsumo}>
            Cigarros convencionais
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonTipoConsumo}
          onPress={() => {
            setTipoConsumo("eletronico");
            setNavigate(true);
          }}
        >
          <Text style={styles.buttonTextTipoConsumo}>Cigarros eletrônicos</Text>
        </TouchableOpacity>
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
  buttonTipoConsumo: {
    width: "75%",
    height: 80,
    backgroundColor: "#66A394",
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextTipoConsumo: {
    color: "white",
    fontSize: 25,
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
  },
});
