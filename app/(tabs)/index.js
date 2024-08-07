import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import style from "../../styles/style";
import CompTelaCarregamento from "../../components/telaCarregamento"

export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D", justifyContent:'center', alignItems:'center'}}>
      <CompTelaCarregamento/>
    </View>
  );
}
