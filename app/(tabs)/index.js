import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import CompTelaCarregamento from "../../components/telaCarregamento";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";

export default function Index() {
  const router = useRouter();
  const { ultimoDiaQueFumou, diasSemFumar } = contarDiasSemFumar();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("Último dia que fumou:", ultimoDiaQueFumou);
    console.log("Dias sem fumar:", diasSemFumar);
  }, [ultimoDiaQueFumou, diasSemFumar]);

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
