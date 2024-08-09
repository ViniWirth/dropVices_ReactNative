import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import style from "../../styles/style";
import { Link } from "expo-router";

export default function TipoConsumo() {
  const [tipoConsumo, setTipoConsumo] = useState("");

  //O TIPO CONSUMO SÓ MUDA DEPOIS DO PROXIMO CLIQUE
  function enviaTipoConsumo() {
    console.log(tipoConsumo);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "Libre Baskerville",
            textAlign: "center",
          }}
        >
          De onde vem o seu consumo de nicotina?
        </Text>
      </View>

      <View style={style.container}>
        <Link href="/cigConvencional" asChild>
          <TouchableOpacity
            style={styles.buttonTipoConsumo}
            onPress={() => {
              setTipoConsumo("cigarro");
              enviaTipoConsumo();
            }}
          >
            <Text style={styles.buttonTextTipoConsumo}>
              Cigarros convencionais
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="cigEletronico" asChild>
          <TouchableOpacity
            style={styles.buttonTipoConsumo}
            onPress={() => {
              setTipoConsumo("eletronico");
              enviaTipoConsumo();
            }}
          >
            <Text style={styles.buttonTextTipoConsumo}>
              Cigarros eletrônicos
            </Text>
          </TouchableOpacity>
        </Link>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextTipoConsumo: {
    color: "white",
    fontSize: 25,
    fontFamily: "Libre Baskerville",
    textAlign: "center",
  },
});
