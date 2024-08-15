import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import CompTelaCarregamento from "../../components/telaCarregamento";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import valorEconomizado from "../functions/valorEconomizado";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
