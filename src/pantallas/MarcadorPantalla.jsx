import React, { useState, useMemo } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
  import { Modal } from 'react-native';
import { usePartida } from '../contexto/PartidaContexto';
import { sumarPuntosAcumulados, haSuperadoLimite } from '../utilidades/puntaje';
import EntradaDePuntos from '../componentes/EntradaDePuntos';
import { guardarPartida } from '../servicios/almacenamiento';

export default function MarcadorPantalla() {
  const { state, registrarRonda, declararGanador, irAlInicio } = usePartida();
  const { modo, jugadores, equipos, rondas, limitePuntos } = state;

  const participantes = modo === 'parejas' ? equipos : jugadores;
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarEntrada, setMostrarEntrada] = useState(false);
  const [modalGanadorVisible, setModalGanadorVisible] = useState(false);

  const ganador = useMemo(() => {
    const lista = participantes.find((p) => haSuperadoLimite(rondas, p.id, limitePuntos));
    return lista || null;
  }, [participantes, rondas, limitePuntos]);

  const onAceptarPuntos = async (puntos) => {
    if (!seleccionado) return;
    registrarRonda({
      id: Date.now(),
      puntos: { [seleccionado]: puntos },
      fecha: new Date().toISOString(),
    });
    setMostrarEntrada(false);
    setSeleccionado(null);

    const participanteGanador = participantes.find((p) => haSuperadoLimite([...rondas, { puntos: { [seleccionado]: puntos } }], p.id, limitePuntos));
    if (participanteGanador) {
      declararGanador({ tipo: modo === 'parejas' ? 'equipo' : 'jugador', id: participanteGanador.id });
      // Guardar partida en historial
      await guardarPartida({
        modo,
        limitePuntos,
        jugadores,
        equipos,
        rondas: [...rondas, { puntos: { [seleccionado]: puntos }, fecha: new Date().toISOString() }],
        ganador: { tipo: modo === 'parejas' ? 'equipo' : 'jugador', id: participanteGanador.id },
        fecha: new Date().toISOString(),
      });
      setModalGanadorVisible(true);
    }
  };

  const verdeEsmeralda = '#4caf50';
  const botonEstilo = {
    backgroundColor: verdeEsmeralda,
    borderRadius: 6,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  };
  const botonAtrasEstilo = {
    backgroundColor: '#23283a',
    borderRadius: 6,
    padding: 10,
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
  };
  return (
    <View style={{ flex: 1, padding: 16, gap: 12, backgroundColor: '#111' }}>
      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 2, letterSpacing: 1 }}>
          Marcador
        </Text>
        <Text style={{ fontSize: 16, color: verdeEsmeralda, fontWeight: 'bold', backgroundColor: '#181c24', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 8, marginTop: 2 }}>
          Límite: {limitePuntos} puntos
        </Text>
      </View>
      {ganador && (
        <View style={{ padding: 12, backgroundColor: '#114b11', borderRadius: 8 }}>
          <Text style={{ color: '#b9ffb9' }}>
            ¡Ganador: {ganador.nombre || ganador.id}!
          </Text>
        </View>
      )}
      {/* Modal de ganador */}
      <Modal visible={modalGanadorVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#181c24', borderRadius: 16, padding: 32, minWidth: 280, maxWidth: 340, alignItems: 'center', borderWidth: 2, borderColor: verdeEsmeralda }}>
            <Text style={{ color: verdeEsmeralda, fontWeight: 'bold', fontSize: 24, marginBottom: 18, textAlign: 'center' }}>
              {ganador?.nombre || ganador?.id} ha ganado
            </Text>
            <TouchableOpacity onPress={() => setModalGanadorVisible(false)} style={{ marginTop: 10, backgroundColor: verdeEsmeralda, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, width: '100%', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={participantes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const total = sumarPuntosAcumulados(rondas, item.id);
          return (
            <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#333' }}>
              <Text style={{ color: '#fff', marginBottom: 4, fontSize: 15 }}>
                {item.nombre || item.id}: {total} puntos
              </Text>
              <TouchableOpacity style={botonEstilo} onPress={() => { setSeleccionado(item.id); setMostrarEntrada(true); }}>
                <Text style={{ color: '#fff', fontWeight: '500', fontSize: 15 }}>Agregar puntos</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        style={{ marginTop: 12 }}
        ListEmptyComponent={
          <Text style={{ color: '#aaa' }}>
            Aún no hay jugadores/equipos configurados.
          </Text>
        }
      />
      {mostrarEntrada && (
        <EntradaDePuntos
          visible={mostrarEntrada}
          onAceptar={onAceptarPuntos}
          onCancelar={() => setMostrarEntrada(false)}
        />
      )}
      <TouchableOpacity style={botonAtrasEstilo} onPress={irAlInicio}>
        <Text style={{ color: verdeEsmeralda, textAlign: 'center', fontWeight: '500', fontSize: 15 }}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
}
