import React from 'react';
import { Text } from "react-native";

export default function Comp1(pinto) {
    return (
        <Text>O {pinto.nome} gosta muito de {pinto.comida}</Text>
    )
}