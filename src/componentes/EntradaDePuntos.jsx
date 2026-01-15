import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EntradaDePuntos({ participanteId, onAceptar, onCancelar }) {
  const [puntos, setPuntos] = useState('');
  // Estilos temáticos
  const verdeEsmeralda = '#4caf50';
  const inputEstilo = {
    backgroundColor: '#23283a',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 22,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: puntos ? verdeEsmeralda : '#444',
    textAlign: 'center',
    width: 180,
  };
  const botonEstilo = {
    backgroundColor: verdeEsmeralda,
    borderColor: verdeEsmeralda,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 18,
    alignItems: 'center',
    width: 180,
    alignSelf: 'center',
    opacity: puntos ? 1 : 0.5,
  };
  const botonCancelarEstilo = {
    backgroundColor: '#23283a',
    borderColor: verdeEsmeralda,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
    width: 180,
    alignSelf: 'center',
    paddingVertical: 14,
  };
  const textoTitulo = {
    color: verdeEsmeralda,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
    letterSpacing: 1,
    textShadowColor: '#23283a',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  };

  return (
    <View style={{ gap: 16, backgroundColor: '#181c24', borderRadius: 12, padding: 24, alignItems: 'center', width: 320, borderWidth: 1.5, borderColor: verdeEsmeralda, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6 }}>
      <Text style={textoTitulo}>Puntos para <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', fontSize: 24 }}>{participanteId}</Text></Text>
      <TextInput
        value={puntos}
        onChangeText={setPuntos}
        keyboardType="numeric"
        style={inputEstilo}
        placeholder="0"
        placeholderTextColor="#aaa"
        selectionColor={verdeEsmeralda}
        onFocus={() => setPuntos('')}
      />
      <TouchableOpacity
        style={botonEstilo}
        onPress={() => onAceptar(Number(puntos) || 0)}
        disabled={!puntos}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Aceptar</Text>
      </TouchableOpacity>
      {onCancelar && (
        <TouchableOpacity
          style={botonCancelarEstilo}
          onPress={onCancelar}
        >
          <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', fontSize: 18 }}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
