import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePartida } from '../contexto/PartidaContexto';

export default function SeleccionModoPantalla({ onSeleccionar }) {
  const [modo, setModo] = useState(null);
  const [puntaje, setPuntaje] = useState(100);
  const { irAlInicio } = usePartida();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona el modo de juego</Text>
      <View style={styles.modos}>
        <TouchableOpacity
          style={[styles.opcion, modo === 'individual' && styles.opcionActiva]}
          onPress={() => setModo('individual')}
        >
          <Text style={styles.textoOpcion}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.opcion, modo === 'parejas' && styles.opcionActiva]}
          onPress={() => setModo('parejas')}
        >
          <Text style={styles.textoOpcion}>Parejas</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Selecciona el puntaje límite</Text>
      <View style={styles.modos}>
        {[50, 75, 100, 200].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.opcion, puntaje === p && styles.opcionActiva]}
            onPress={() => setPuntaje(p)}
          >
            <Text style={styles.textoOpcion}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.boton, !(modo && puntaje) && { opacity: 0.5 }]}
        onPress={() => modo && puntaje && onSeleccionar(modo, puntaje)}
        disabled={!(modo && puntaje)}
      >
        <Text style={styles.textoBoton}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.boton, { backgroundColor: '#888', borderColor: '#888', marginTop: 12 }]}
        onPress={irAlInicio}
      >
        <Text style={[styles.textoBoton, { color: '#fff' }]}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 18,
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modos: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  opcion: {
    backgroundColor: '#222',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  opcionActiva: {
    borderColor: '#4caf50',
    backgroundColor: 'rgba(76,175,80,0.13)',
  },
  textoOpcion: {
    color: '#fff',
    fontSize: 18,
  },
  boton: {
    marginTop: 18,
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
