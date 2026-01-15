import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { PartidaProvider, usePartida } from './src/contexto/PartidaContexto';
import InicioPantalla from './src/pantallas/InicioPantalla';
import FormularioParticipantes from './src/pantallas/FormularioParticipantes';
import MarcadorPantalla from './src/pantallas/MarcadorPantalla';
import SeleccionModoPantalla from './src/pantallas/SeleccionModoPantalla';
import HistorialPantalla from './src/pantallas/HistorialPantalla';
function Contenido() {
  const { vista, crearPartida, configurarLimites, irAlFormulario } = usePartida();
  if (vista === 'formulario') return <FormularioParticipantes />;
  if (vista === 'marcador') return <MarcadorPantalla />;
  if (vista === 'seleccionModo') {
    return <SeleccionModoPantalla onSeleccionar={(modo, puntaje) => {
      crearPartida({ modo });
      configurarLimites(puntaje);
      irAlFormulario();
    }} />;
  }
  if (vista === 'historial') return <HistorialPantalla />;
  return <InicioPantalla />;
}

export default function App() {
  return (
    <PartidaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
        <StatusBar barStyle="light-content" />
        <Contenido />
      </SafeAreaView>
    </PartidaProvider>
  );
}
