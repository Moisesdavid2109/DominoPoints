import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { cargarPartidas } from '../servicios/almacenamiento';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePartida } from '../contexto/PartidaContexto';

export default function HistorialPantalla() {
  const [partidas, setPartidas] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const { irAlInicio } = usePartida();

  // Limpiar historial
  const limpiarHistorialStorage = async () => {
    await AsyncStorage.removeItem('historial_partidas');
    setPartidas([]);
  };

  const limpiarHistorial = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Esta acción eliminará todas las partidas guardadas. ¿Deseas continuar?')) {
        limpiarHistorialStorage();
      }
    } else {
      Alert.alert(
        '¿Limpiar historial?',
        'Esta acción eliminará todas las partidas guardadas. ¿Deseas continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Limpiar',
            style: 'destructive',
            onPress: limpiarHistorialStorage,
          },
        ]
      );
    }
  };

  useEffect(() => {
    cargarPartidas().then((data) => {
      // Ordenar por fecha descendente (más reciente primero)
      const ordenadas = Array.isArray(data)
        ? [...data].sort((a, b) => {
            // Si no hay fecha, lo pone al final
            if (!a.fecha && !b.fecha) return 0;
            if (!a.fecha) return 1;
            if (!b.fecha) return -1;
            return b.fecha - a.fecha;
          })
        : [];
      setPartidas(ordenadas);
    });
  }, []);

  const verdeEsmeralda = '#4caf50';

  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 8, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#888', borderRadius: 7, paddingVertical: 10, alignItems: 'center' }}
            onPress={irAlInicio}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: verdeEsmeralda, borderRadius: 7, paddingVertical: 10, alignItems: 'center' }}
            onPress={limpiarHistorial}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Limpiar historial</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 12 }}>Historial de Partidas</Text>
        {partidas.length === 0 ? (
          <Text style={{ color: '#aaa' }}>No hay partidas registradas.</Text>
        ) : (
          partidas.map((p) => (
            <TouchableOpacity key={p.id} onPress={() => setDetalle(p)} activeOpacity={0.7} style={{ backgroundColor: '#222', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: verdeEsmeralda }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Modo: {p.modo}</Text>
              <Text style={{ color: '#fff' }}>Límite: {p.limitePuntos}</Text>
              <Text style={{ color: '#fff' }}>Ganador: {p.ganador?.id || 'Desconocido'}</Text>
              <Text style={{ color: '#aaa', fontSize: 12 }}>Fecha: {p.fecha ? new Date(p.fecha).toLocaleString() : 'Sin fecha'}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <Modal visible={!!detalle} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#181c24', borderRadius: 12, padding: 24, minWidth: 300, maxWidth: 350, borderWidth: 2, borderColor: verdeEsmeralda }}>
            <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>Detalle de la Partida</Text>
            {detalle && (
              <>
                <Text style={{ color: '#fff', marginBottom: 4 }}>Modo: {detalle.modo}</Text>
                <Text style={{ color: '#fff', marginBottom: 4 }}>Límite: {detalle.limitePuntos}</Text>
                <Text style={{ color: '#fff', marginBottom: 4 }}>Ganador: {detalle.ganador?.id || 'Desconocido'}</Text>
                <Text style={{ color: '#fff', marginBottom: 4 }}>Fecha: {detalle.fecha ? new Date(detalle.fecha).toLocaleString() : 'Sin fecha'}</Text>
                <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', marginTop: 10, marginBottom: 4 }}>Jugadores:</Text>
                {detalle.jugadores && detalle.jugadores.map((j, idx) => (
                  <Text key={j.id || idx} style={{ color: '#fff', fontSize: 14, marginLeft: 8 }}>- {j.nombre || j.id}</Text>
                ))}
                {detalle.equipos && detalle.equipos.length > 0 && (
                  <>
                    <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', marginTop: 10, marginBottom: 4 }}>Equipos:</Text>
                    {detalle.equipos.map((e, idx) => (
                      <Text key={e.id || idx} style={{ color: '#fff', fontSize: 14, marginLeft: 8 }}>- {e.nombre || e.id} ({(e.miembros || []).join(', ')})</Text>
                    ))}
                  </>
                )}
                <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', marginTop: 10, marginBottom: 4 }}>Rondas:</Text>
                {detalle.rondas && detalle.rondas.length > 0 ? (
                  detalle.rondas.map((r, idx) => (
                    <Text key={r.id || idx} style={{ color: '#fff', fontSize: 13, marginLeft: 8 }}>
                      Ronda {idx + 1}: {Object.entries(r.puntos).map(([pid, pts]) => `${pid}: ${pts}`).join(', ')}
                    </Text>
                  ))
                ) : (
                  <Text style={{ color: '#aaa', fontSize: 13, marginLeft: 8 }}>Sin rondas</Text>
                )}
              </>
            )}
            <TouchableOpacity onPress={() => setDetalle(null)} style={{ marginTop: 18, backgroundColor: verdeEsmeralda, borderRadius: 8, padding: 10, alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
