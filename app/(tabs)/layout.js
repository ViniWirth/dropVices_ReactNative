import React from "react";
import { StyleSheet, View } from "react-native";
import { Slot } from "expo-router";
import CompNavBar from "../../components/navbar"; // Ajuste o caminho conforme necessário

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot /> {/* Renderiza o conteúdo da página atual */}
      </View>
      <CompNavBar /> {/* Adiciona a NavBar fixa */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 70, // Aumente a margem para garantir espaço suficiente para a NavBar
  },
});
