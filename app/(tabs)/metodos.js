import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import CompNavBar from "../../components/navbar";

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

const Card = ({ image, text, link }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link); // Abre o link no navegador ou app associado
    } else {
      alert("Não foi possível abrir o link.");
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function Metodos() {
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
            <Card image={item.image} text={item.text} link={item.link} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      </View>
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
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Libre Baskerville",
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
    fontFamily: "Libre Baskerville",
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    flexShrink: 1,
    textDecorationLine: "underline",
  },
});
