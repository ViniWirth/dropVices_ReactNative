import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Font from "expo-font";
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
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "LibreBaskerville-Regular": require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
        "LondrinaSolid-Black": require("../../assets/fonts/LondrinaSolid-Black.ttf"),
        "LibreBaskerville-Bold": require("../../assets/fonts/LibreBaskerville-Bold.ttf"),
      });
      setFontLoaded(true); // Atualiza o estado quando a fonte for carregada
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

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
        pathname: "registro/bemVindo",
        params: { email, senha },
      });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <Link href={"/inicial"}>
          <Text
            style={{
              fontSize: 34,
              fontFamily: "LibreBaskerville-Regular",
              color: "white",
            }}
          >
            <AntDesign name="left" size={34} color="white" />
            Registro
          </Text>
        </Link>
      </View>
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
        <Text style={{ fontFamily: "LibreBaskerville-Bold" }}>DropVices</Text>
      </View>
    </View>
  );
}
