import React, { useState } from "react";
import { Link } from "expo-router";
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

  function handleSignIn() {
    const data = {
      email,
      senha,
    };
    console.log(data);
  }

  return (
    <View style={{ flex: 1, backgroundColor:"#73AA9D" }}>
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

        <Link href = "/bemVindo" asChild>
        <TouchableOpacity style={style.button} onPress={handleSignIn}>
          <Text style={style.buttonText}>Entrar</Text>
        </TouchableOpacity>
        </Link>
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
