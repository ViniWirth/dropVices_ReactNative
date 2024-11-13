import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../styles/style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import contarDiasSemFumar from "./functions/contarDiasSemFumar";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function mostrarDias() {
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
    } else if (diasSemFumar >= 43 /*&& diasSemFumar <= 59*/) {
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
    }
  }, [diasSemFumar]);

  return (
    <View>
      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <Link href={"/home"}>
          <Text style={{ fontSize: 34, fontFamily: "Libre Baskerville" }}>
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
                { position: "absolute", zIndex: 1, marginLeft: "5%" },
              ]}
            >
              Objetivo
            </Text>
            <Text style={style.textoEmCaixa}>{objetivo}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: "5%",
          marginRight: "24%",
          marginLeft: "32%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 60,
            fontWeight: "bold",
            color: "#73AA9D",
          }}
        >
          {diasSemFumar}
        </Text>
        <Text style={[style.textoBorda, { alignSelf: "center" }]}>{etapa}</Text>
      </View>
      <View>
        <Text style={[style.textoEmCaixa, { margin: 15 }]}>{descricao}</Text>
      </View>
    </View>
  );
}
