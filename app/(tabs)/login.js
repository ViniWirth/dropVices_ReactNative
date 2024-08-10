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
import axios from "axios";

export default function CompLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  async function handleLogin() {
    const data = {
      email,
      senha,
    };
    console.log(data);
    if (email == null || email == "" || senha == null || senha == "") {
      alert("Preencha todos os campos!");
    } else {
      try {
        const resposta = await axios.post(
          "http://192.168.2.190:3000/usuarios/login",
          data
        );
        router.push("/");
        console.log(resposta.data);
      } catch (error) {
        alert(error.response.data);
        console.log(error);
      }
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
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Entrar</Text>
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
