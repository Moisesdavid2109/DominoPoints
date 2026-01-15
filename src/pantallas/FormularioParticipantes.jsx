import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { usePartida } from '../contexto/PartidaContexto';

export default function FormularioParticipantes() {
  const { state, actualizarJugadores, actualizarEquipos, irAlMarcador, irAlInicio } = usePartida();
  const { modo, jugadores, equipos } = state;

  const [nombresJugadores, setNombresJugadores] = useState(
    jugadores.map((j) => j.nombre || '')
  );
  const [nombresEquipos, setNombresEquipos] = useState(
    equipos.map((e) => e.nombre || '')
  );

  const esParejas = modo === 'parejas';

  const puedeContinuar = useMemo(() => {
    if (esParejas) {
      // Solo se requieren los nombres de los equipos
      return nombresEquipos.length === 2 && nombresEquipos.every((n) => n && n.trim().length > 0);
    }
    return nombresJugadores.length === 4 && nombresJugadores.every((n) => n && n.trim().length > 0);
  }, [esParejas, nombresJugadores, nombresEquipos]);

  const guardar = () => {
    let nuevosJugadores = jugadores;
    // Si no hay jugadores (caso parejas), crearlos
    if (nuevosJugadores.length !== 4) { 
      nuevosJugadores = [
        { id: 'j1', nombre: nombresJugadores[0] || 'Jugador 1' },
        { id: 'j2', nombre: nombresJugadores[1] || 'Jugador 2' },
        { id: 'j3', nombre: nombresJugadores[2] || 'Jugador 3' },
        { id: 'j4', nombre: nombresJugadores[3] || 'Jugador 4' },
      ];
    } else {
      nuevosJugadores = jugadores.map((j, idx) => ({ ...j, nombre: nombresJugadores[idx] || j.nombre }));
    }
    actualizarJugadores(nuevosJugadores);

    if (esParejas) {
      // Asignar miembros: primeros dos al Equipo 1, últimos dos al Equipo 2
      const equipo1Miembros = [nuevosJugadores[0].id, nuevosJugadores[1].id];
      const equipo2Miembros = [nuevosJugadores[2].id, nuevosJugadores[3].id];
      const nuevosEquipos = equipos.map((e, idx) => ({
        ...e,
        nombre: nombresEquipos[idx] || e.nombre,
        miembros: idx === 0 ? equipo1Miembros : equipo2Miembros,
      }));
      actualizarEquipos(nuevosEquipos);
    }

    irAlMarcador();
  };

  // Estilos temáticos
  const verdeEsmeralda = '#4caf50';
  const inputEstilo = {
    backgroundColor: '#181c24',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: verdeEsmeralda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  };
  const botonEstilo = {
    backgroundColor: puedeContinuar ? verdeEsmeralda : 'transparent',
    borderColor: "#000",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 7,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    opacity: 1,
    shadowColor: verdeEsmeralda,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  };
  const textoTitulo = {
    fontSize: 28,
    fontWeight: 'bold',
    color: verdeEsmeralda,
    marginBottom: 16,
    letterSpacing: 1,
    textShadowColor: '#23283a',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  };

  // Input con borrado al enfocar
  const renderInput = (value, idx, onChange, placeholder, setValue) => (
    <TextInput
      key={idx}
      value={value}
      onChangeText={onChange}
      onFocus={() => setValue((prev) => {
        const copia = [...prev];
        copia[idx] = '';
        return copia;
      })}
      style={inputEstilo}
      placeholder={placeholder}
      placeholderTextColor="#7ecfff"
      selectionColor="#4caf50"
    />
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111' }} contentContainerStyle={{ padding: 28, gap: 28, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ ...textoTitulo, color: '#fff' }}>
        {esParejas ? 'Nombres de los equipos' : 'Nombres de los jugadores'}
      </Text>
      {esParejas
        ? nombresEquipos.map((nombre, idx) =>
            renderInput(nombre, idx, (t) => {
              const copia = [...nombresEquipos];
              copia[idx] = t; setNombresEquipos(copia);
            }, `Equipo ${idx + 1}`, setNombresEquipos)
          )
        : nombresJugadores.map((nombre, idx) =>
            renderInput(nombre, idx, (t) => {
              const copia = [...nombresJugadores];
              copia[idx] = t; setNombresJugadores(copia);
            }, `Jugador ${idx + 1}`, setNombresJugadores)
          )}
      <TouchableOpacity
        style={botonEstilo}
        onPress={guardar}
        disabled={!puedeContinuar}
      >
        <Text style={{ color: puedeContinuar ? '#fff' : verdeEsmeralda, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, textShadowColor: puedeContinuar ? verdeEsmeralda : 'transparent', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 4 }}>
          Continuar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#888', borderColor: '#888', borderWidth: 2, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 7, marginTop: -10, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 2 }} onPress={irAlInicio}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Atrás</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
