import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_HISTORIAL = 'historial_partidas';

export async function guardarPartida(partida) {
  const existentes = await cargarPartidas();
  const nuevas = [...existentes, { ...partida, id: Date.now() }];
  await AsyncStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(nuevas));
  return nuevas;
}

export async function cargarPartidas() {
  const raw = await AsyncStorage.getItem(CLAVE_HISTORIAL);
  return raw ? JSON.parse(raw) : [];
}
