import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ExibirResposta() {
  const [resposta, setResposta] = useState(null);

  useEffect(() => {
    async function buscarResposta() {
      try {
        const respostaArmazenada = await AsyncStorage.getItem("resposta");
        if (respostaArmazenada !== null) {
          setResposta(JSON.parse(respostaArmazenada));
          console.log("Resposta:"+ resposta );
          console.log("Resposta:"+ respostaArmazenada );
        }
      } catch (error) {
        console.log("Erro ao buscar resposta no AsyncStorage", error);
      }
    }

    buscarResposta();
  }, []);

  return(
    <Text>Id do apoiado : {resposta.idapoiado}</Text>

  );
}
