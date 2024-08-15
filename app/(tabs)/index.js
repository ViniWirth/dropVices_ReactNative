import React, { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import CompTelaCarregamento from "../../components/telaCarregamento";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import valorEconomizado from "../functions/valorEconomizado";

export default function Index() {
  const router = useRouter();
  const { ultimoDiaQueFumou, diasSemFumar } = contarDiasSemFumar();
  const { tipoConsumo, quantidadeMacos, valorMaco, valorCigarroEletronico, duracaoCigarroEletronico } = valorEconomizado();
  console.log(tipoConsumo, quantidadeMacos, valorMaco, valorCigarroEletronico, duracaoCigarroEletronico);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/inicial");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);*/

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
