import React from 'react';
import { View, Text } from 'react-native';
import { sumarPuntosAcumulados } from '../utilidades/puntaje';

export default function TableroDeEquipos({ equipos, rondas }) {
  return (
    <View style={{ gap: 8 }}>
      {equipos.map((eq) => {
        const total = sumarPuntosAcumulados(rondas, eq.id);
        return (
          <View key={eq.id} style={{ padding: 8, backgroundColor: '#1e1e1e', borderRadius: 8 }}>
            <Text style={{ color: '#fff' }}>{eq.nombre || eq.id}</Text>
            <Text style={{ color: '#4caf50' }}>{total} puntos</Text>
          </View>
        );
      })}
    </View>
  );
}
