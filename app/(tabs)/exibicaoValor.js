import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import valorEconomizado from "../functions/valorEconomizado";
import CompNavBar from "../../components/navbar";
import * as Font from "expo-font";
import { useRouter } from "expo-router";  // Importando o useRouter para navegação

export default function ExibicaoValor() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(0);
  const [valorMaco, setValorMaco] = useState(0);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(0);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorEditado, setValorEditado] = useState("");
  const [campoEditado, setCampoEditado] = useState("");

  const { valorTotalEconomizado = 0 } = valorEconomizado();

  const router = useRouter(); // Usando o useRouter para navegação

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
    fetchValores();
  }, []);

  const pegarIdApoiado = async () => {
    const idapoiado = await AsyncStorage.getItem("resposta");
    return idapoiado;
  };

  const fetchValores = async () => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      const response = await axios.get(`${ipv4}/usuarios/getValores`, {
        params: { idapoiado },
      });
      const {
        tipoConsumo,
        quantidadeMacos,
        valorMaco,
        valorCigarroEletronico,
        duracaoCigarroEletronico,
      } = response.data;
      setTipoConsumo(tipoConsumo);
      setQuantidadeMacos(quantidadeMacos);
      setValorMaco(valorMaco);
      setValorCigarroEletronico(valorCigarroEletronico);
      setDuracaoCigarroEletronico(duracaoCigarroEletronico);
    } catch (error) {
      console.error("Erro ao buscar os valores:", error);
      alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
    }
  };

  const openModal = (campo, valor) => {
    setCampoEditado(campo);
    setValorEditado(String(valor));
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEditValue = async () => {
    if (isNaN(parseFloat(valorEditado))) {
      alert("Por favor, insira um valor numérico válido.");
      return;
    }

    const newValue = parseFloat(valorEditado);

    if (campoEditado === "valorMaco") {
      setValorMaco(newValue);
    } else if (campoEditado === "quantidadeMacos") {
      setQuantidadeMacos(newValue);
    } else if (campoEditado === "valorCigarroEletronico") {
      setValorCigarroEletronico(newValue);
    } else if (campoEditado === "duracaoCigarroEletronico") {
      setDuracaoCigarroEletronico(newValue);
    }

    await atualizarValoresNoBanco(campoEditado, newValue);

    // Redireciona para a mesma página para recarregar
    router.push("/exibicaoValor"); // Recarregando a página

    closeModal();
  };

  const atualizarValoresNoBanco = async (campo, valor) => {
    try {
      const ipv4 = process.env.EXPO_PUBLIC_IPV4;
      const idapoiado = await pegarIdApoiado();
      await axios.post(`${ipv4}/usuarios/atualizarValores`, {
        idapoiado,
        campo,
        valor,
      });
      console.log("Valores atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar os valores:", error);
      alert("Não foi possível atualizar os dados. Tente novamente mais tarde.");
    }
  };

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Quanto você deixou de gastar com seu esforço?
        </Text>

        {tipoConsumo === "cigarro" && (
          <>
            <TouchableOpacity onPress={() => openModal("valorMaco", valorMaco)}>
              <Text style={styles.subTitle}>Valor médio do maço:</Text>
              <Text style={styles.value}>{`R$${valorMaco}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal("quantidadeMacos", quantidadeMacos)
              }
            >
              <Text style={styles.subTitle}>Maços utilizados:</Text>
              <View style={styles.valueContainer}>
                <Text
                  style={styles.valueText}
                >{`${quantidadeMacos} maços`}</Text>
              </View>
              <Text style={styles.subText}>por dia</Text>
            </TouchableOpacity>
          </>
        )}

        {tipoConsumo === "eletronico" && (
          <>
            <TouchableOpacity
              onPress={() =>
                openModal("valorCigarroEletronico", valorCigarroEletronico)
              }
            >
              <Text style={styles.subTitle}>
                Valor médio do cigarro eletrônico:
              </Text>
              <Text style={styles.value}>{`R$${valorCigarroEletronico}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openModal("duracaoCigarroEletronico", duracaoCigarroEletronico)
              }
            >
              <Text style={styles.subTitle}>Duração:</Text>
              <Text
                style={styles.value}
              >{`${duracaoCigarroEletronico} dias`}</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.title}>Valor total economizado:</Text>
        <Text style={styles.totalValue}>R${valorTotalEconomizado}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Valor</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={valorEditado}
              onChangeText={(text) => setValorEditado(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEditValue} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <CompNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 70,
    marginTop: "-12%",
    justifyContent: "center",
  },
  title: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 32,
    textAlign: "center",
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  subTitle: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 24,
    textAlign: "center",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  value: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 80,
    textAlign: "center",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    color: "#73AA9D",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
  },
  valueText: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 80,
    color: "#73AA9D",
  },
  totalValue: {
    fontFamily: "LibreBaskerville-Bold",
    color: "#73AA9D",
    fontSize: 100,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    fontSize: 18,
    padding: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    backgroundColor: "#73AA9D",
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 18,
  },
  subText: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 25,
    textAlign: "center",
    color: "#73AA9D",
    marginTop: 5,
  },
});
