import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import * as Notifications from "expo-notifications"; // Importação para usar notificações
import CompTelaCarregamento from "../components/telaCarregamento";
import { Image } from "react-native";

export default function Index() {
  const router = useRouter();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Carregar as fontes
    Font.loadAsync({
      "LibreBaskerville-Regular": require("../assets/fonts/LibreBaskerville-Regular.ttf"),
      "LibreBaskerville-Bold": require("../assets/fonts/LibreBaskerville-Bold.ttf"),
    }).then(() => setFontLoaded(true));

    // Função para pedir permissões de notificação diretamente pelo expo-notifications
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync(); // Novo método para pedir permissão
      if (status !== "granted") {
        alert("Você precisa de permissões para receber notificações");
      } else {
        scheduleNotification(); // Agendar notificações após permissão
      }
    };

    // Função para agendar notificações aleatórias a cada 8 horas
    const scheduleNotification = () => {
      const randomMessage = getRandomNotificationMessage();

      // Agendar a notificação para 8 horas
      Notifications.scheduleNotificationAsync({
        content: {
          title: randomMessage.title,
          body: randomMessage.body,
        },
        trigger: {
          seconds: 6 * 60 * 60,
          repeats: true, // A notificação se repetirá a cada 6 horas
        },
      });
    };

    // Função para gerar uma mensagem aleatória para a notificação
    const getRandomNotificationMessage = () => {
      const messages = [
        {
          title: "Você está mais forte a cada dia!",
          body: "Cada dia sem nicotina é uma conquista importante. Continue assim!",
        },
        {
          title: "Continue firme no seu objetivo!",
          body: "Sua saúde agradece por cada segundo sem o vício. Siga firme!",
        },
        {
          title: "Cada dia sem nicotina é uma vitória!",
          body: "Lembre-se de como você está mais forte a cada dia. Não desista!",
        },
        {
          title: "Respire fundo, você está no caminho certo!",
          body: "Você está se libertando de um vício que não controla mais a sua vida. Continue!",
        },
        {
          title: "Você é capaz de vencer esse vício!",
          body: "Sua jornada é um exemplo de força e determinação. Está indo muito bem!",
        },
        {
          title: "Mantenha-se motivado!",
          body: "Fazer o que é melhor para você nunca foi tão importante. Continue o ótimo trabalho!",
        },
      ];
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    // Chamar funções quando a fonte for carregada
    if (fontLoaded) {
      requestPermission(); // Pedir permissões
    }

    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000); // Redireciona após 3 segundos

    return () => clearTimeout(timer);
  }, [fontLoaded]); // A dependência 'fontLoaded' garante que as notificações sejam agendadas após o carregamento da fonte

  if (!fontLoaded) {
    return <CompTelaCarregamento />; // Tela de carregamento enquanto a fonte é carregada
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#73AA9D",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CompTelaCarregamento />
    </View>
  );
}
