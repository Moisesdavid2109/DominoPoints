import React, { createContext, useContext, useReducer } from 'react';

const EstadoInicial = {
  vista: 'inicio',
  modo: null,            // 'individual' | 'parejas'
  jugadores: [],         // [{ id, nombre }]
  equipos: [],           // [{ id, nombre, miembros: [id,id] }]
  limitePuntos: 100,     // 50 | 75 | 100 | 200
  rondas: [],            // [{ id, puntos: { participanteId: number }, fecha }]
  ganador: null,         // { tipo: 'jugador'|'equipo', id }
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREAR_PARTIDA':
      return {
        ...EstadoInicial,
        modo: action.payload.modo,
        jugadores: action.payload.jugadores || (action.payload.modo === 'individual'
          ? [{ id: 'j1', nombre: 'Jugador 1' }, { id: 'j2', nombre: 'Jugador 2' }, { id: 'j3', nombre: 'Jugador 3' }, { id: 'j4', nombre: 'Jugador 4' }]
          : []),
        equipos: action.payload.equipos || (action.payload.modo === 'parejas'
          ? [{ id: 'e1', nombre: 'Equipo 1' }, { id: 'e2', nombre: 'Equipo 2' }]
          : []),
      };
    case 'CONFIGURAR_LIMITES':
      return { ...state, limitePuntos: action.payload.limitePuntos };
    case 'ACTUALIZAR_JUGADORES':
      return { ...state, jugadores: action.payload.jugadores };
    case 'ACTUALIZAR_EQUIPOS':
      return { ...state, equipos: action.payload.equipos };
    case 'REGISTRAR_RONDA':
      return { ...state, rondas: [...state.rondas, action.payload] };
    case 'DECLARAR_GANADOR':
      return { ...state, ganador: action.payload };
    case 'SET_VISTA':
      return { ...state, vista: action.payload };
    default:
      return state;
  }
}

const Ctx = createContext(null);

export function PartidaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, EstadoInicial);

  const crearPartida = ({ modo, jugadores, equipos }) =>
    dispatch({ type: 'CREAR_PARTIDA', payload: { modo, jugadores, equipos } });
  const configurarLimites = (limitePuntos) =>
    dispatch({ type: 'CONFIGURAR_LIMITES', payload: { limitePuntos } });
  const actualizarJugadores = (jugadores) =>
    dispatch({ type: 'ACTUALIZAR_JUGADORES', payload: { jugadores } });
  const actualizarEquipos = (equipos) =>
    dispatch({ type: 'ACTUALIZAR_EQUIPOS', payload: { equipos } });
  const registrarRonda = (ronda) =>
    dispatch({ type: 'REGISTRAR_RONDA', payload: ronda });
  const declararGanador = (ganador) =>
    dispatch({ type: 'DECLARAR_GANADOR', payload: ganador });
  const irAlFormulario = () => dispatch({ type: 'SET_VISTA', payload: 'formulario' });
  const irAlMarcador = (vistaDestino = 'marcador') => dispatch({ type: 'SET_VISTA', payload: vistaDestino });
  const irAlInicio = () => dispatch({ type: 'SET_VISTA', payload: 'inicio' });
  const irASeleccionModo = () => dispatch({ type: 'SET_VISTA', payload: 'seleccionModo' });

  const valor = {
    state,
    vista: state.vista,
    crearPartida,
    configurarLimites,
    registrarRonda,
    declararGanador,
    actualizarJugadores,
    actualizarEquipos,
    irAlFormulario,
    irAlMarcador,
    irAlInicio,
    irASeleccionModo,
  };

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export const usePartida = () => useContext(Ctx);
