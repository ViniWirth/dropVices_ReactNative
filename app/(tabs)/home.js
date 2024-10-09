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
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            //backgroundColor: "blue",
          }}
        >
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 120,
              fontWeight: "bold",
              color: "#73AA9D",
            }}
          >
            {diasSemFumar}
          </Text>
        </View>
        <View
          style={{
            //backgroundColor: "pink",
            width: "50%",
            justifyContent: "Center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              backgroundColor: "#73AA9D",
              color: "white",
              fontWeight: 500,
              fontSize: 23,
              padding: 10,
              paddingHorizontal: 50,
              textAlign: "center",
              borderRadius: 20,
            }}
          >
            ${valorTotalEconomizado}
          </Text>
        </View>
      </View>
    </View>
  );
}
