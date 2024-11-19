import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import style from "../../styles/style";
import * as Font from "expo-font";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import valorEconomizado from "../functions/valorEconomizado";
import CompNavBar from "../../components/navbar";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { valorTotalEconomizado } = valorEconomizado();
  const { diasSemFumar } = contarDiasSemFumar();

  const frases = [
    "Continue firme! Cada dia é uma vitória.",
    "Sua saúde agradece essa escolha!",
    "Um passo de cada vez. Você está no caminho certo!",
    "Você é mais forte que o vício!",
    "A liberdade vale cada esforço. Continue assim!",
  ];
  const [fraseMotivacional, setFraseMotivacional] = useState(frases[0]);

  const [imgArvoreSrc, setImgArvoreSrc] = useState(
    require("../../assets/imgs/etapasArvore/etapa1.png")
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const temasNicotina = [
    {
      titulo: "O que é nicotina?",
      texto:
        "A nicotina é uma substância química altamente viciante encontrada no tabaco. Ela age no sistema nervoso central e, ao ser inalada ou absorvida, gera uma sensação de prazer momentâneo, mas provoca dependência rápida. Essa dependência é responsável por manter as pessoas fumando, mesmo sabendo dos danos causados à saúde.",
    },
    {
      titulo: "Danos à saúde",
      texto:
        "A nicotina contribui para o desenvolvimento de várias doenças graves, incluindo câncer de pulmão, doenças cardíacas, enfisema e bronquite crônica. Além disso, ela prejudica a circulação sanguínea, aumentando o risco de derrames e infartos.",
    },
    {
      titulo: "Impacto financeiro",
      texto:
        "O vício em cigarro não afeta apenas a saúde, mas também o bolso. O custo acumulado com cigarros ao longo dos anos pode ser surpreendentemente alto. Dinheiro que poderia ser investido em lazer, saúde ou educação acaba sendo desperdiçado.",
    },
    {
      titulo: "Benefícios de parar",
      texto:
        "Ao parar de fumar, o corpo começa a se recuperar quase que imediatamente. Dentro de 20 minutos, a pressão arterial e a frequência cardíaca se estabilizam. Após algumas semanas, a circulação melhora e a capacidade pulmonar aumenta. A longo prazo, o risco de doenças graves diminui drasticamente.",
    },
    {
      titulo: "Apoio emocional",
      texto:
        "Parar de fumar pode ser emocionalmente desafiador, mas buscar apoio de amigos, familiares ou grupos de apoio pode fazer toda a diferença. A dependência emocional do cigarro é tão forte quanto a física, e superar ambas exige esforço e paciência.",
    },
    {
      titulo: "A liberdade de uma vida sem vícios",
      texto:
        "Ao deixar o cigarro, você conquista uma liberdade única. Não estar preso a horários, gastar dinheiro ou preocupar-se com a saúde traz um alívio enorme. Cada dia sem fumar é um passo em direção a uma vida mais plena e saudável.",
    },
    {
      titulo: "Dicas para parar de fumar",
      texto:
        "1. Defina uma data para parar de fumar.\n2. Descarte todos os cigarros, isqueiros e cinzeiros.\n3. Mantenha-se ocupado com atividades que distraiam a vontade de fumar.\n4. Evite situações que costumavam ser associadas ao cigarro.\n5. Busque apoio de amigos, familiares ou grupos de apoio.\n6. Lembre-se dos benefícios de parar de fumar.\n7. Não desanime com recaídas. Cada tentativa é um aprendizado.",
    },
    {
      titulo: "Ajuda profissional",
      texto:
        "Se você está tendo dificuldades para parar de fumar, não hesite em procurar ajuda profissional. Médicos, psicólogos e terapeutas podem oferecer orientação e tratamentos que facilitam o processo de abandono do cigarro.",
    },
    {
      titulo: "Mitos e verdades sobre o cigarro",
      texto:
        "1. Fumar apenas socialmente não faz mal: MITO. Mesmo fumar ocasionalmente pode causar danos à saúde.\n2. Cigarros light são menos prejudiciais: MITO. Todos os tipos de cigarro são nocivos.\n3. Parar de fumar engorda: VERDADE. O aumento de peso é comum, mas pode ser controlado com alimentação saudável e exercícios.\n4. Fumar ajuda a relaxar: MITO. O cigarro gera uma falsa sensação de relaxamento, mas prejudica a saúde e aumenta o estresse.",
    },
    {
      titulo: "Cigarro eletrônico",
      texto:
        "O cigarro eletrônico, ou vape, é uma alternativa ao cigarro tradicional que utiliza vapor de nicotina. Apesar de ser considerado menos prejudicial, ainda não há consenso sobre seus efeitos a longo prazo. Além disso, o vape pode ser uma porta de entrada para o tabagismo, especialmente entre os jovens.",
    },
    {
      titulo: "Cigarro e COVID-19",
      texto:
        "Fumantes têm maior risco de desenvolver complicações graves da COVID-19, pois o tabagismo prejudica o sistema respiratório e a capacidade pulmonar. Parar de fumar é uma das melhores formas de se proteger contra.",
    },
    {
      titulo: "Cigarro e gravidez",
      texto:
        "O tabagismo durante a gravidez é extremamente prejudicial ao bebê, aumentando o risco de aborto, parto prematuro, baixo peso ao nascer e problemas de saúde ao longo da vida. Parar de fumar é essencial para garantir a saúde.",
    },
  ];

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
          "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
          "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error("Erro ao carregar fontes: ", error);
      }
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const novaFrase = frases[Math.floor(Math.random() * frases.length)];
      setFraseMotivacional(novaFrase);
    }, 15 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (diasSemFumar >= 8 && diasSemFumar <= 13) {
      setImgArvoreSrc(require("../../assets/imgs/etapasArvore/etapa2.png"));
    } else if (diasSemFumar >= 14 && diasSemFumar <= 29) {
      setImgArvoreSrc(require("../../assets/imgs/etapasArvore/etapa3.png"));
    } else if (diasSemFumar >= 30 && diasSemFumar <= 42) {
      setImgArvoreSrc(require("../../assets/imgs/etapasArvore/etapa4.png"));
    } else if (diasSemFumar >= 43 && diasSemFumar <= 59) {
      setImgArvoreSrc(require("../../assets/imgs/etapasArvore/etapa5.png"));
    } else if (diasSemFumar >= 60) {
      setImgArvoreSrc(
        require("../../assets/imgs/etapasArvore/arvoreFinal.png")
      );
    }
  }, [diasSemFumar]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#73AA9D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <Link href={"/inicial"}>
          <Text
            style={{ fontSize: 30, fontFamily: "LibreBaskerville-Regular" }}
          >
            <AntDesign name="left" size={30} color="black" />
            Sair
          </Text>
        </Link>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.daysContainer}>
          <Text
            style={[styles.daysText, { fontFamily: "LibreBaskerville-Bold" }]}
          >
            {diasSemFumar}
          </Text>
        </View>

        <View style={styles.economyContainer}>
          <Text
            style={[
              styles.economyText,
              { fontFamily: "LibreBaskerville-Regular" },
            ]}
          >
            ${valorTotalEconomizado}
          </Text>
          <Link href={"/mostrarDias"}>
            <ImageBackground
              style={styles.treeContainer}
              source={imgArvoreSrc}
              resizeMode="contain"
            />
          </Link>
        </View>
      </View>

      <View style={styles.motivationalContainer}>
        <Text
          style={[
            styles.motivationalText,
            { fontFamily: "LibreBaskerville-Regular" },
          ]}
        >
          {fraseMotivacional}
        </Text>
      </View>

      {/* Botões sobre Nicotina */}
      <ScrollView contentContainerStyle={styles.infoContainer}>
        {temasNicotina.map((tema, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => {
              setModalText(tema.texto);
              setModalVisible(true);
            }}
          >
            <Text
              style={[styles.buttonText, { fontFamily: "LondrinaSolid-Black" }]}
            >
              {tema.titulo}
            </Text>
          </TouchableOpacity>
        ))}
        <Image
          source={require("../../assets/imgs/white.jpg")}
          style={{ width: "100%", height: 90,}}
        />
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text
                style={[
                  styles.modalText,
                  { fontFamily: "LibreBaskerville-Regular" },
                ]}
              >
                {modalText}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={[
                  styles.closeButtonText,
                  { fontFamily: "LibreBaskerville-Regular" },
                ]}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CompNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#73AA9D",
    alignItems: "center",
    justifyContent: "center",
  },
  container: { flex: 1 },
  mainContent: { flexDirection: "row", marginTop: 30 },
  daysContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  daysText: { fontSize: 170, color: "#73AA9D" },
  economyContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  economyText: {
    backgroundColor: "#73AA9D",
    color: "white",
    fontSize: 32,
    padding: 10,
    paddingHorizontal: 50,
    textAlign: "center",
    borderRadius: 20,
  },
  treeContainer: {
    width: 200,
    height: 200,
  },
  motivationalContainer: { margin: 10 },
  motivationalText: { fontSize: 32, textAlign: "center" },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    backgroundColor: "#73AA9D",
    width: "48%",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 30 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: { fontSize: 22, textAlign: "justify", marginBottom: 20 },
  closeButton: { backgroundColor: "#73AA9D", padding: 10, borderRadius: 5 },
  closeButtonText: { color: "white", fontSize: 16 },
});
