import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import style from "../../styles/style";
import axios from "axios";

export default function metodos() {
  return (
    <View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text
          style={{
            fontFamily: "LibreBaskerville-Bold",
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Vontade de fumar?
        </Text>
        <Text
          style={{
            fontFamily: "Libre Baskerville",
            fontSize: 21,
            textAlign: "center",
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
          }}
        >
          Escolha algum métodos que separamos para você e que irá ajuda-lo com
          isso. Lembre-se sempre de seus objetivos!
        </Text>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "#73AA9D",
            borderRadius: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            textDecorationLine: "underline",
            }}
          >
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#73AA9D",
            borderRadius: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            textDecorationLine: "underline",
            }}
          >
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#73AA9D",
            borderRadius: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            textDecorationLine: "underline",
            }}
          >
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#73AA9D",
            borderRadius: 20,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/imgs/logoDropVices.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              fontFamily: "Libre Baskerville",
              fontSize: 20,
              color: "white",
              marginLeft: 10,
            textDecorationLine: "underline",
            }}
          >
            Sons relaxantes para acalmar a mente
          </Text>
        </View>
      </View>
    </View>
  );
}
