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

export default function ExibicaoValor() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(0);
  const [valorMaco, setValorMaco] = useState(0);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(0);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorEditado, setValorEditado] = useState("");

  const { valorTotalEconomizado = 0 } = valorEconomizado(); // Valor padrão

  useEffect(() => {
    // Carregar fontes assim que o componente for montado
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true); // Atualiza o estado quando a fonte for carregada
    };

    loadFonts();
    fetchValores(); // Carregar valores assim que o componente for montado
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
      const { tipoConsumo, quantidadeMacos, valorMaco, valorCigarroEletronico, duracaoCigarroEletronico } = response.data;
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

  const [textoValorMedio, setTextoValorMedio] = useState("Valor médio do maço:");
  const [valorMedio, setValorMedio] = useState(`R$${valorMaco}`);
  const [textoUtilizadosDuracao, setTextoUtilizadosDuracao] = useState("Maços utilizados:");
  const [utilizadosDuracao, setUtilizadosDuracao] = useState(`${quantidadeMacos} maços`);

  useEffect(() => {
    if (tipoConsumo === "eletronico") {
      setTextoValorMedio("Valor médio do cigarro eletrônico:");
      setValorMedio(`R$${valorCigarroEletronico}`);
      setTextoUtilizadosDuracao("Duração:");
      setUtilizadosDuracao(`${duracaoCigarroEletronico} dias`);
    } else {
      setTextoValorMedio("Valor médio do maço:");
      setValorMedio(`R$${valorMaco}`);
      setTextoUtilizadosDuracao("Maços utilizados:");
      setUtilizadosDuracao(`${quantidadeMacos} maços`);
    }
  }, [tipoConsumo, valorMaco, valorCigarroEletronico, quantidadeMacos, duracaoCigarroEletronico]);

  const openModal = (valorTipo) => {
    setModalVisible(true);
    setValorEditado(String(valorTipo)); // Converte para string
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEditValue = () => {
    if (isNaN(parseFloat(valorEditado))) {
      alert("Por favor, insira um valor numérico válido.");
      return;
    }

    const newValue = parseFloat(valorEditado);
    if (valorEditado == valorMaco) {
      setValorMaco(newValue);
    } else if (valorEditado == valorCigarroEletronico) {
      setValorCigarroEletronico(newValue);
    } else if (valorEditado == quantidadeMacos) {
      setQuantidadeMacos(newValue);
    }
    closeModal();
  };

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quanto você deixou de gastar com seu esforço?</Text>
        <TouchableOpacity onPress={() => openModal(valorMaco)}>
          <Text style={styles.subTitle}>{textoValorMedio}</Text>
          <Text style={styles.value}>{valorMedio}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal(quantidadeMacos)}>
          <Text style={styles.subTitle}>{textoUtilizadosDuracao}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{utilizadosDuracao}</Text>
          </View>
        </TouchableOpacity>
        {tipoConsumo === "cigarro" && (
          <View style={styles.perDay}>
            <Text style={styles.perDayText}>por dia</Text>
          </View>
        )}
        <Text style={styles.title}>Valor total economizado:</Text>
        <Text style={styles.totalValue}>R${String(valorTotalEconomizado)}</Text>
      </View>

      {/* Modal para edição */}
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
  perDay: {
    alignItems: "center",
  },
  perDayText: {
    fontFamily: "LibreBaskerville-Bold",
    fontSize: 28,
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
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "LibreBaskerville-Bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: "LibreBaskerville-Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#73AA9D",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "LibreBaskerville-Bold",
  },
});
