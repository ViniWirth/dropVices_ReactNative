import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import style from "../../styles/style";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function motivo() {


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
          Qual o principal motivo que o levou a parar de fumar? Reflita bem!
        </Text>
      </View>

      <View style={style.container}>
        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Minha saúde</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Meu bem-estar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Ciclo social</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Economizar dinheiro</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Aparência</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/apresentArvore" asChild>
          <TouchableOpacity style={styles.buttonMotivo}>
            <Text style={styles.buttonTextMotivo}>Fertilidade</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextMotivo: {
    color: "white",
    fontSize: 25,
    fontFamily: "Libre Baskerville",
    textAlign: "center",
  },
});
