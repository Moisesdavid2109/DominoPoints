
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { BACKGROUND_IMAGE, TITULO_DOMINO_POINTS_IMAGE, MESA_DOMINO_IMAGE } from '../utilidades/imagenes';
import { usePartida } from '../contexto/PartidaContexto';

export default function InicioPantalla() {
  const { irASeleccionModo, irAlMarcador, irAlInicio, vista } = usePartida();
  return (
    <SafeAreaView style={styles.container}>
      {/* Fondo verde esmeralda */}
      <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay} />
      {/* Título grande arriba */}
      <View style={[styles.tituloContainer, { pointerEvents: 'none' }]}>
        <Image source={TITULO_DOMINO_POINTS_IMAGE} style={styles.logo} resizeMode="contain" />
      </View>
      {/* Mesa y botones agrupados */}
      <View style={styles.mesaContainer}>
        <Image source={MESA_DOMINO_IMAGE} style={styles.mesaDomino} resizeMode="contain" />
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity style={styles.button} onPress={irASeleccionModo}>
          <Text style={styles.buttonText}>Nueva Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => irAlMarcador && irAlMarcador('historial')}>
          <Text style={styles.buttonText}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}} disabled>
          <Text style={styles.buttonText}>Amigos</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.copyright}>Copyright © 2026 Moises Becerra</Text>
    </SafeAreaView>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  mesaContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
    height: screenHeight * 0.5,
    justifyContent: 'flex-end',
  },
  botonesContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.14,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
    gap: 22,
  },
  container: {
    flex: 1,
    backgroundColor: '#222',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7,
    borderRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  tituloContainer: {
    position: 'absolute',
    top: screenHeight * 0.18,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  logo: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.18,
    marginBottom: 0,
    marginTop: 0,
    maxWidth: 500,
    maxHeight: 200,
  },
  mesaDomino: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.50,
    maxWidth: 520,
    maxHeight: 370,
    opacity: 0.92,
    marginBottom: 0,
    marginTop: 0,
    alignSelf: 'center',
    zIndex: 2,
  },
  menuSobreMesa: {
    width: 320,
    alignItems: 'center',
    gap: 18,
    marginTop: -60,
    zIndex: 3,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 40,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#fff',
  },
  menu: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
    marginBottom: 40,
  },
  button: {
    width: screenWidth * 0.6,
    maxWidth: 320,
    backgroundColor: 'rgba(30,30,30,0.85)',
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 2,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  copyright: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    opacity: 0.8,
  },
});
