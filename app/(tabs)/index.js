import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import style from "../../styles/style";
import CompTelaCarregamento from "../../components/telaCarregamento";
import { useRouter } from "expo-router";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";

export default function Index() {
  const router = useRouter();



  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000);

    // Limpeza do temporizador quando o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#73AA9D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CompTelaCarregamento/>
    </View>
  );
}
