# Dominó - Contador de Partidas (Expo)

Proyecto en JavaScript/JSX y español.

## Estructura
- src/pantallas: Vistas principales
- src/componentes: UI reutilizable
- src/contexto: Estado global de partida
- src/servicios: Almacenamiento local con AsyncStorage
- src/utilidades: Lógica de puntajes

## Desarrollo
```bash
cd miAppDomino
npx expo install @react-native-async-storage/async-storage
npx expo start
```

## Flujo inicial
- En Inicio selecciona modo y límite
- Se crea partida y se navega al marcador
- En Marcador puedes registrar puntos (ejemplo incluido)
