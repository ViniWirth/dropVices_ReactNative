import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import style from "../../styles/style";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import valorEconomizado from "../functions/valorEconomizado";
import CompNavBar from "../../components/navbar";

export default function Home() {
  const { valorTotalEconomizado } = valorEconomizado();
  const { diasSemFumar } = contarDiasSemFumar();

  const [imgArvore, setImgArvore] = useState(
    <Image
      style={style.imgHome}
      source={require("../../assets/imgs/etapasArvore/etapa1.png")}
    />
  );
  const [etapa, setEtapa] = useState("1ª etapa");

  // Frases motivacionais
  const frases = [
    "Continue firme! Cada dia é uma vitória.",
    "Sua saúde agradece essa escolha!",
    "Um passo de cada vez. Você está no caminho certo!",
    "Você é mais forte que o vício!",
    "A liberdade vale cada esforço. Continue assim!",
  ];

  const [fraseMotivacional, setFraseMotivacional] = useState(frases[0]);

  // Atualiza a frase motivacional a cada 3 minutos
  useEffect(() => {
    const intervalId = setInterval(() => {
      const novaFrase = frases[Math.floor(Math.random() * frases.length)];
      setFraseMotivacional(novaFrase);
    }, 3 * 60 * 1000); // 3 minutos em milissegundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, []);

  useEffect(() => {
    if (diasSemFumar >= 8 && diasSemFumar <= 13) {
      setImgArvore(
        <Image
          style={style.imgHome}
          source={require("../../assets/imgs/etapasArvore/etapa2.png")}
        />
      );
      setEtapa("2ª etapa");
    } else if (diasSemFumar >= 14 && diasSemFumar <= 29) {
      setImgArvore(
        <Image
          style={style.imgHome}
          source={require("../../assets/imgs/etapasArvore/etapa3.png")}
        />
      );
      setEtapa("3ª etapa");
    } else if (diasSemFumar >= 30 && diasSemFumar <= 42) {
      setImgArvore(
        <Image
          style={style.imgHome}
          source={require("../../assets/imgs/etapasArvore/etapa4.png")}
        />
      );
      setEtapa("4ª etapa");
    } else if (diasSemFumar >= 43) {
      setImgArvore(
        <Image
          style={style.imgHome}
          source={require("../../assets/imgs/etapasArvore/etapa5.png")}
        />
      );
      setEtapa("5ª etapa");
    }
  }, [diasSemFumar]);

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{diasSemFumar}</Text>
        </View>

        <View style={styles.economyContainer}>
          <Link href={"/exibicaoValor"}>
            <Text style={styles.economyText}>${valorTotalEconomizado}</Text>
          </Link>
          <Link href={"/mostrarDias"}>
            <View style={styles.treeContainer}>{imgArvore}</View>
          </Link>
        </View>
      </View>

      <View style={styles.motivationalContainer}>
        <Text style={styles.motivationalText}>{fraseMotivacional}</Text>
      </View>

      <CompNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner ocupa toda a tela
  },
  mainContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20, // Ajusta a margem superior
  },
  daysContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  daysText: {
    fontFamily: "Libre Baskerville",
    fontSize: 170,
    fontWeight: "bold",
    color: "#73AA9D",
  },
  economyContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  economyText: {
    fontFamily: "Libre Baskerville",
    backgroundColor: "#73AA9D",
    color: "white",
    fontWeight: 500,
    fontSize: 32,
    padding: 10,
    paddingHorizontal: 60,
    textAlign: "center",
    borderRadius: 20,
  },
  treeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  motivationalContainer: {
    margin: 10,
  },
  motivationalText: {
    fontFamily: "Libre Baskerville",
    fontSize: 32,
    textAlign: "center",
    marginTop: 30,
  },
});
