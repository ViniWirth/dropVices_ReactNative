import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Font from "expo-font";
import style from "../styles/style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import contarDiasSemFumar from "./functions/contarDiasSemFumar";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function mostrarDias() {
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Image
          source={require("../assets/imgs/etapasArvore/arvoreFinal.png")}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <View>
        <Text
          style={{ ...style.textoEmCaixa, fontSize: 40, marginBottom: -36 }}
        >
          Parabéns! Você conseguiu!
        </Text>
        <Text
          style={{ ...style.textoEmCaixa, fontStyle: "italic", fontSize: 24 }}
        >
          Você concluiu seu objetivo de 2 meses sem fumar! Não há mais resíduos
          de nicotina no seu corpo. Você está cada vez mais saudável e mais
          próximo da sua nova vida! Continue assim!
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Link href={"/home"}>
          <TouchableOpacity
            style={{ backgroundColor: "#73AA9D", borderRadius: 15 }}
          >
            <Text
              style={{
                fontFamily: "Libre Baskerville",
                padding: 15,
                fontSize: 20,
              }}
            >
              Continue com seu progresso!
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
