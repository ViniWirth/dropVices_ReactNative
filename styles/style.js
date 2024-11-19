import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //index.js TELA CARREGAMENTO
  telaCarregamento: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#73AA9D",
  },
  logoCarregamento: {
    width: 200,
    height: 200,
  },

  //footer
  footer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },
  logoFooter: {
    width: 65,
    height: 65,
  },

  //container padrao
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#73AA9D",
  },

  //input padrao
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 40,
    fontSize: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "LibreBaskerville-Regular",
    color: "#3E3E3E",
  },

  button: {
    width: "40%",
    height: 50,
    backgroundColor: "#E2E2E2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
  },
  buttonText: {
    color: "#3E3E3E",
    fontSize: 18,
    fontFamily: "LibreBaskerville-Bold",
    textAlign: "center",
  },

  logoCima: {
    alignItems: "center",
    marginTop: "30%",
  },

  //bemVindo.js
  textoBemVindoDiv: {
    marginLeft: "6%",
    marginRight: "6%",
    marginTop: 30,
  },
  textoBemVindo: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
  },
  garotaOi: {
    width: 300,
    height: 300,
  },
  buttonAvancar: {
    width: "40%",
    height: 50,
    backgroundColor: "#E2E2E2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  //tipoConsumo.js
  buttonTipoConsumo: {
    width: "75%",
    height: 80,
    backgroundColor: "#66A394",
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTextTipoConsumo: {
    color: "white",
    fontSize: 25,
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
  },

  //quantMacos.js
  textoQuant: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
    marginBottom: 30,
  },
  //arvore.js
  imgArvore: {
    width: 250,
    height: 350,
  },
  textoBorda: {
    fontFamily: "LibreBaskerville-Regular",
    fontSize: 24,
    color: "white",
    backgroundColor: "#73AA9D",
    padding: 6.5,
    borderRadius: 20,
    width: 120,
    textAlign: "center",
  },
  textoEmCaixa: {
    fontFamily: "LibreBaskerville-Regular",
    textAlign: "center",
    fontSize: 15,
    borderWidth: 1, // Define a largura da borda
    borderColor: "#287687", // Define a cor da borda
    borderRadius: 2, // Adiciona bordas arredondadas
    marginTop: 35,
    padding: 10,
    color: "black", // Certifique-se de que a cor do texto é visível
    backgroundColor: "white", // Adiciona um fundo, se necessário
  },

  //home

  imgHome: {
    width: 70,
    height: 100,
    marginTop: 10,
  },
});
