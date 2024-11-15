import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import valorEconomizado from "../functions/valorEconomizado";
import CompNavBar from "../../components/navbar";

export default function ExibicaoValor() {
  const [tipoConsumo, setTipoConsumo] = useState(null);
  const [quantidadeMacos, setQuantidadeMacos] = useState(0);
  const [valorMaco, setValorMaco] = useState(0);
  const [valorCigarroEletronico, setValorCigarroEletronico] = useState(0);
  const [duracaoCigarroEletronico, setDuracaoCigarroEletronico] = useState(0);
  const { valorTotalEconomizado } = valorEconomizado();

  const [modalVisible, setModalVisible] = useState(false);
  const [valorEditado, setValorEditado] = useState("");

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
      setTipoConsumo(response.data.tipoConsumo);
      setQuantidadeMacos(response.data.quantidadeMacos);
      setValorMaco(response.data.valorMaco);
      setValorCigarroEletronico(response.data.valorCigarroEletronico);
      setDuracaoCigarroEletronico(response.data.duracaoCigarroEletronico);
    } catch (error) {
      console.error("Erro ao buscar os valores:", error);
    }
  };

  useEffect(() => {
    fetchValores();
  }, []);

  const [textoValorMedio, setTextoValorMedio] = useState("Valor médio do maço:");
  const [valorMedio, setValorMedio] = useState(`R$${valorMaco}`);
  const [textoUtilizadosDuracao, setTextoUtilizadosDuracao] = useState("Maços utilizados:");
  const [utilizadosDuracao, setUtilizadosDuracao] = useState(quantidadeMacos);

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
    setValorEditado(valorTipo);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleEditValue = () => {
    if (valorEditado === valorMaco) {
      setValorMaco(valorEditado);
    } else if (valorEditado === valorCigarroEletronico) {
      setValorCigarroEletronico(valorEditado);
    } else if (valorEditado === quantidadeMacos) {
      setQuantidadeMacos(valorEditado);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Quanto você deixou de gastar com seu esforço?
        </Text>
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
        <Text style={styles.totalValue}>R${valorTotalEconomizado}</Text>
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
              value={String(valorEditado)}
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

      <CompNavBar /> {/* A NavBar ficará fixa na parte inferior da tela */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner ocupa toda a tela
  },
  content: {
    flex: 1, // O conteúdo ocupa o restante do espaço
    paddingBottom: 70, // Adiciona espaço para a NavBar
    marginTop: "-12%",
    justifyContent: "center", // Centraliza o conteúdo
  },
  title: {
    fontFamily: "Libre Baskerville",
    fontSize: 32,
    textAlign: "center",
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  subTitle: {
    fontFamily: "Libre Baskerville",
    fontSize: 24,
    textAlign: "center",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  value: {
    fontFamily: "Libre Baskerville",
    fontSize: 80,
    textAlign: "center",
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    color: "#73AA9D",
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
  },
  valueText: {
    fontFamily: "Libre Baskerville-Bold",
    fontSize: 80,
    color: "#73AA9D",
    fontWeight: "bold",
  },
  perDay: {
    alignItems: "center",
  },
  perDayText: {
    fontFamily: "Libre Baskerville-Bold",
    fontSize: 28,
    color: "#73AA9D",
  },
  totalValue: {
    fontFamily: "Libre Baskerville-Bold",
    fontWeight: "bold",
    color: "#73AA9D",
    fontSize: 100,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  // Estilos do Modal
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
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
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
    fontSize: 18,
  },
});
