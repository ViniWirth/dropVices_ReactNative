import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import style from "../../styles/style";

export default function TipoConsumo() {
  const [tipoConsumo, setTipoConsumo] = useState("");


  //O TIPO CONSUMO SÓ MUDA DEPOIS DO PROXIMO CLIQUE
  function enviaTipoConsumo() {
    console.log(tipoConsumo);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#73AA9D" }}>
      <View style={style.textoBemVindoDiv}>
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "Libre Baskerville",
            textAlign: "center",
          }}
        >
          De onde vem o seu consumo de nicotina?
        </Text>
      </View>

      <View style={style.container}>
        <TouchableOpacity 
          style={style.buttonTipoConsumo} 
          onPress={() => {
            setTipoConsumo("cigarro");
            enviaTipoConsumo();
          }}
        >
          <Text style={style.buttonTextTipoConsumo}>
            Cigarros convencionais
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={style.buttonTipoConsumo} 
          onPress={() => {
            setTipoConsumo("eletronico");
            enviaTipoConsumo();
          }}
        >
          <Text style={style.buttonTextTipoConsumo}>
            Cigarros eletrônicos
          </Text>
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
