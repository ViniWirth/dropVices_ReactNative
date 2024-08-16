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
import style from "../../styles/style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import contarDiasSemFumar from "../functions/contarDiasSemFumar";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import valorEconomizado from "../functions/valorEconomizado";

export default function mostrarDias() {
  const { valorTotalEconomizado } = valorEconomizado();
  const { diasSemFumar } = contarDiasSemFumar();
  //{Math.floor(valorTotalEconomizado)}
return (
    <View>
        <Text>{diasSemFumar}</Text>
    </View>
);
}
