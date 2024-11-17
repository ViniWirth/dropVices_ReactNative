import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import CompNavBar from "../../components/navbar";
import * as Font from "expo-font";
import { WebView } from "react-native-webview"; // Importa a WebView

const methods = [
  {
    id: "1",
    image: require("../../assets/imgs/musicas.jpg"),
    text: "Música relaxante para aliviar a ansiedade",
    link: "https://youtu.be/UyqN7lEFkpY?si=dfrSW-F0ER1madzb",
  },
  {
    id: "2",
    image: require("../../assets/imgs/respiracao.jpg"),
    text: "Técnicas de respiração para reduzir o estresse",
    link: "https://youtu.be/UJBknAsxfrA?si=acm5Je8hqeZvGFoN",
  },
  {
    id: "3",
    image: require("../../assets/imgs/yoga.jpg"),
    text: "Meditação guiada para foco e serenidade",
    link: "https://youtu.be/_19x_vCtb-E?si=BvSFBUNl7N1UiH7c",
  },
  {
    id: "4",
    image: require("../../assets/imgs/yoga.jpg"),
    text: "Alongamentos e relaxamento para o corpo",
    link: "https://youtu.be/VaIvW6BcV_Y?si=V5pFcqkeT3Xv7IB0",
  },
  {
    id: "5",
    image: require("../../assets/imgs/musicas.jpg"),
    text: "Som da natureza para relaxar e meditar",
    link: "https://youtu.be/lE6RYpe9IT0?si=tEgbx56iJbq8SliE",
  },
  {
    id: "6",
    image: require("../../assets/imgs/yoga.jpg"),
    text: "Prática de Yoga para aliviar a ansiedade",
    link: "https://youtu.be/KCkOCxPSlKE?si=VfAj3L8BUEKi7r-6",
  },
  {
    id: "7",
    image: require("../../assets/imgs/respiracao.jpg"),
    text: "Respiração para melhorar o sono",
    link: "https://youtu.be/90tpylJ_K-U?si=Rr9E70FLNiTu4dDl",
  },
  {
    id: "8",
    image: require("../../assets/imgs/yoga.jpg"),
    text: "Como começar a meditar em casa",
    link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
  },
  {
    id: "9",
    image: require("../../assets/imgs/musicas.jpg"),
    text: "Música clássica para relaxar a mente",
    link: "https://youtu.be/uk-DSogtQRo?si=eBkYBJ5xCoNjNElL",
  },
  {
    id: "10",
    image: require("../../assets/imgs/yoga.jpg"),
    text: "Relaxamento muscular progressivo",
    link: "https://youtu.be/SiPsG6OwrrA?si=SqPrxO7QyzxWWo2q",
  },
];

const Card = ({ image, text, link, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(link)}>
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardText}>{text}</Text>
  </TouchableOpacity>
);

export default function Metodos() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controle do modal
  const [webViewLink, setWebViewLink] = useState(""); // Link para WebView

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  // Função para abrir o link na WebView
  const handlePress = (link) => {
    setWebViewLink(link);
    setIsModalVisible(true); // Exibe o modal
  };

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Muita ansiedade?</Text>
          <Text style={styles.subtitle}>
            Escolha algum método que separamos para você e que irá ajudá-lo com
            isso. Lembre-se sempre de seus objetivos!
          </Text> 
        </View>

        <FlatList
          data={methods}
          renderItem={({ item }) => (
            <Card
              image={item.image}
              text={item.text}
              link={item.link}
              onPress={handlePress}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>

      {/* Modal para exibir o WebView */}
      {isModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <WebView
              source={{ uri: webViewLink }} // Carrega o link na WebView
              style={styles.webview}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <CompNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  content: {
    flex: 1,
    paddingBottom: 70,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 21,
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#73AA9D",
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  cardText: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    flexShrink: 1,
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  webview: {
    flex: 1,
    marginBottom: 60,
  },
  closeButton: {
    backgroundColor: "#73AA9D",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "LibreBaskerville-Regular",
  },
});
