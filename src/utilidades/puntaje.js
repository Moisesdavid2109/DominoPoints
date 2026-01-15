export function sumarPuntosAcumulados(rondas, participanteId) {
  return rondas.reduce((acc, r) => acc + (r.puntos[participanteId] || 0), 0);
}

export function haSuperadoLimite(rondas, participanteId, limite) {
  return sumarPuntosAcumulados(rondas, participanteId) >= limite;
}
