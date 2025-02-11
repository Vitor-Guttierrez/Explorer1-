import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormularioOcorrencia = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [historico, setHistorico] = useState([]);

  const selecionarFoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (resposta) => {
      if (!resposta.didCancel && resposta.assets) {
        setFoto(resposta.assets[0].uri);
      }
    });
  };

  const enviarOcorrencia = async () => {
    const ocorrencia = { nome, descricao, foto, localizacao };
    const historicoAtualizado = [...historico, ocorrencia];
    setHistorico(historicoAtualizado);
    await AsyncStorage.setItem("ocorrencias", JSON.stringify(historicoAtualizado));
    alert("Ocorrência registrada com sucesso!");
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#e0f2f1" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2e7d32", marginBottom: 10 }}>Registro de Encontro com Animal Silvestre</Text>
      
      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome} style={estilos.input} />
      
      <Text>Descrição do encontro:</Text>
      <TextInput value={descricao} onChangeText={setDescricao} multiline style={estilos.input} />
      
      <TouchableOpacity onPress={selecionarFoto} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Anexar Foto</Text>
      </TouchableOpacity>
      {foto && <Image source={{ uri: foto }} style={{ width: 100, height: 100, marginVertical: 10 }} />}
      
      <Text>Localização:</Text>
      <MapView
        style={{ width: "100%", height: 200 }}
        onPress={(e) => setLocalizacao(e.nativeEvent.coordinate)}
      >
        {localizacao && <Marker coordinate={localizacao} />}
      </MapView>
      
      <TouchableOpacity onPress={enviarOcorrencia} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Registrar Ocorrência</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = {
  input: {
    height: 40,
    borderColor: "#2e7d32",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  botao: {
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
  },
};

export default FormularioOcorrencia;
