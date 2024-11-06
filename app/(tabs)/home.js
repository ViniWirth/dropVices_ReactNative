import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import style from "../../styles/style";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import valorEconomizado from "../functions/valorEconomizado";

export default function mostrarDias() {
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
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 170,
              fontWeight: "bold",
              color: "#73AA9D",
            }}
          >
            {diasSemFumar}
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Libre Baskerville",
                backgroundColor: "#73AA9D",
                color: "white",
                fontWeight: 500,
                fontSize: 32,
                padding: 10,
                paddingHorizontal: 60,
                textAlign: "center",
                borderRadius: 20,
              }}
            >
              ${valorTotalEconomizado}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {imgArvore}
          </View>
        </View>
      </View>
      <View style={{margin:10}}>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 32,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          {fraseMotivacional}
        </Text>
      </View>
    
    
          FAZER A PARTE DAS DOCUEMNTACIOES
    

    </View>
  );
}
