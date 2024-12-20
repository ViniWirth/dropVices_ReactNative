import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import style from "../styles/style";
import * as Font from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import contarDiasSemFumar from "./functions/contarDiasSemFumar";

export default function MostrarDias() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imgArvore, setImgArvore] = useState(
    <Image
      style={style.imgArvore}
      source={require("../assets/imgs/etapasArvore/etapa1.png")}
    />
  );
  const [etapa, setEtapa] = useState("1ª etapa");
  const [objetivo, setObjetivo] = useState(
    "Fique livre da nicotina por 7 dias!"
  );
  const [descricao, setDescricao] = useState(
    "Os primeiros dias sem o uso da nicotina são os mais críticos, devido ao nível de abstinência. Mas não desista agora, esse marco é essencial para que você possa se recuperar desse vício!"
  );

  const { diasSemFumar } = contarDiasSemFumar();
  console.log("diasSemFumar: " + diasSemFumar);

  // Carregar fontes
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LondrinaSolid-Black": require("../assets/fonts/LondrinaSolid-Black.ttf"),
        "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontsLoaded(true); // Defina como true quando as fontes estiverem carregadas
    }
    loadFonts();
  }, []);

  // Condicional para atualizar as etapas conforme os dias sem fumar
  useEffect(() => {
    if (diasSemFumar >= 8 && diasSemFumar <= 13) {
      setImgArvore(
        <Image
          style={style.imgArvore}
          source={require("../assets/imgs/etapasArvore/etapa2.png")}
        />
      );
      setEtapa("2ª etapa");
      setObjetivo("Fique livre da nicotina por 14 dias!");
      setDescricao(
        "Parabéns, você chegou a segunda etapa, e agora seus sintomas de abstinência já tendem a diminuir. Continue com foco e persistência em sua jornada e lembre-se sempre de seus objetivos!"
      );
      console.log("Imagem atualizada para etapa 2.");
    } else if (diasSemFumar >= 14 && diasSemFumar <= 29) {
      setImgArvore(
        <Image
          style={style.imgArvore}
          source={require("../assets/imgs/etapasArvore/etapa3.png")}
        />
      );
      setEtapa("3ª etapa");
      setObjetivo("Fique livre da nicotina por 1 mês!");
      setDescricao(
        "Você acaba de completar mais uma etapa muito importante para sua vida. A partir de agora diversos benefícios já surgem em seu organismo, como melhora na circulação, melhora na respiração, melhoras no olfato e paladar e até mesmo melhoras na sua pele. Você foi muito forte até aqui, continue assim!"
      );
    } else if (diasSemFumar >= 30 && diasSemFumar <= 42) {
      setImgArvore(
        <Image
          style={style.imgArvore}
          source={require("../assets/imgs/etapasArvore/etapa4.png")}
        />
      );
      setEtapa("4ª etapa");
      setObjetivo("Fique livre da nicotina por 43 dias!");
      setDescricao(
        "Você concluiu 1 mês sem fumar! De agora em diante novos hábitos começam a se consolidar em seu dia a dia e seus riscos de recaídas tendem a diminuir. Você está indo muito bem e está quase chegando a última etapa, não desista agora!"
      );
    } else if (diasSemFumar >= 43 && diasSemFumar <= 59) {
      setImgArvore(
        <Image
          style={style.imgArvore}
          source={require("../assets/imgs/etapasArvore/etapa5.png")}
        />
      );
      setEtapa("5ª etapa");
      setObjetivo("Fique livre da nicotina por 2 meses!");
      setDescricao(
        "Bem-vindo(a) a 5 etapa, você realmente tem se dedicado! Novos hábitos estão se estabelecendo em sua vida e você está  seguindo rumo a fase final para conseguir superar esse vício. Tenha orgulho de si mesmo, você está quase lá!"
      );
    } else if (diasSemFumar >= 60) {
      router.push({
        pathname: "etapaFinal",
      });
    }
  }, [diasSemFumar]);

  // Se as fontes não estiverem carregadas, renderiza uma tela de carregamento
  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View>
      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <Link href={"/home"}>
          <Text
            style={{ fontSize: 34, fontFamily: "LibreBaskerville-Regular" }}
          >
            <AntDesign name="left" size={34} color="black" />
            Sua árvore
          </Text>
        </Link>
      </View>

      <View style={{ marginTop: "5%" }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imgArvore}
        </View>
      </View>

      <View>
        <View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={[
                style.textoBorda,
                { position: "absolute", zIndex: 1, marginLeft: 30 },
              ]}
            >
              Objetivo
            </Text>
            <Text
              style={[style.textoEmCaixa, { marginLeft: 40, marginRight: 40 }]}
            >
              {objetivo}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginRight: "24%",
          marginLeft: "32%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "LibreBaskerville-Bold",
            fontSize: 60,
            color: "#73AA9D",
          }}
        >
          {diasSemFumar}
        </Text>
        <Text style={[style.textoBorda, { alignSelf: "center" }]}>{etapa}</Text>
      </View>
      <View>
        <Text style={[style.textoEmCaixa, { marginLeft: 20, marginRight: 20 }]}>
          {descricao}
        </Text>
      </View>
    </View>
  );
}
