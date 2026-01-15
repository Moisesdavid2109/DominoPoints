import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function IngresoNombres({ modalidad, onContinuar, onAtras }) {
  const [nombres, setNombres] = useState(
    modalidad === 'individual'
      ? ['', '', '', '']
      : ['', '']
  );

  const handleNombreChange = (idx, valor) => {
    const nuevos = [...nombres];
    nuevos[idx] = valor;
    setNombres(nuevos);
  };

  const esValido = nombres.every((n) => n.trim().length > 0);

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ color: '#fff', fontSize: 18, marginBottom: 8 }}>
        {modalidad === 'individual'
          ? 'Introduce el nombre de cada jugador'
          : 'Introduce el nombre del líder de cada pareja'}
      </Text>
      {nombres.map((nombre, idx) => (
        <TextInput
          key={idx}
          style={{
            backgroundColor: '#222',
            color: '#fff',
            borderRadius: 6,
            padding: 5,
            marginBottom: 4,
          }}
          placeholder={
            modalidad === 'individual'
              ? `Jugador ${idx + 1}`
              : `Líder pareja ${idx + 1}`
          }
          placeholderTextColor="#888"
          value={nombre}
          onChangeText={(valor) => handleNombreChange(idx, valor)}
        />
      ))}
      <View style={{ width: '100%', marginTop: 8 }}>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: esValido ? '#4caf50' : '#333',
            borderRadius: 7,
            paddingVertical: 10,
            alignItems: 'center',
            opacity: esValido ? 1 : 0.7,
            marginBottom: 6,
          }}
          onPress={() => onContinuar(nombres)}
          disabled={!esValido}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: '#888',
            borderRadius: 7,
            paddingVertical: 10,
            alignItems: 'center',
          }}
          onPress={onAtras}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Atrás</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
