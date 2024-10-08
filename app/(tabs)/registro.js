import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../../styles/style";

export default function CompRegistro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const router = useRouter();

  function handleRegistro() {
    const data = {
      email,
      senha,
    };
    if (
      email == null ||
      email == "" ||
      senha == null ||
      senha == "" ||
      confirmarSenha == null ||
      confirmarSenha == ""
    ) {
      alert("Preencha todos os campos!");
    } else if (senha != confirmarSenha) {
      alert("As senhas não coincidem!");
    } else {
      router.push({
        pathname: "/bemVindo",
        params: { email, senha },
      });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.container}>
        <TextInput
          style={style.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#888"
        />

        <TextInput
          style={style.input}
          onChangeText={setSenha}
          value={senha}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />

        <TextInput
          style={style.input}
          onChangeText={setConfirmarSenha}
          value={confirmarSenha}
          placeholder="Confirmar senha"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <TouchableOpacity style={style.button} onPress={handleRegistro}>
          <Text style={style.buttonText}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
      <View style={style.footer}>
        <Image
          style={style.logoFooter}
          source={require("../../assets/imgs/logoDropVices.png")}
        />
        <Text style={{ fontFamily: "Libre Baskerville", fontWeight: "bold" }}>
          DropVices
        </Text>
      </View>
    </View>
  );
}
