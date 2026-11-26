// Word problems per multiplication table (es, neutral Spanish). a = answer; `why` must evaluate to a (checked at build).
export const PROBLEMS = {
  0: [
    { q: 'Hay 6 platos vacíos. ¿Cuántas galletas hay en total?', a: 0, why: '6 × 0 = 0' },
    { q: 'Lucía mete 0 canicas en cada una de sus 9 bolsas. ¿Cuántas canicas guarda?', a: 0, why: '9 × 0 = 0' },
    { q: 'Un juego da 0 puntos por cada fallo. Si fallas 7 veces, ¿cuántos puntos sumas?', a: 0, why: '7 × 0 = 0' },
  ],
  1: [
    { q: 'Cada niño lleva 1 mochila. Si hay 8 niños, ¿cuántas mochilas hay?', a: 8, why: '8 × 1 = 8' },
    { q: 'Una caja tiene 1 lápiz. ¿Cuántos lápices hay en 12 cajas?', a: 12, why: '12 × 1 = 12' },
    { q: 'Mateo lee 1 cuento cada noche. ¿Cuántos cuentos lee en una semana?', a: 7, why: '7 × 1 = 7' },
  ],
  2: [
    { q: 'Cada bicicleta tiene 2 ruedas. ¿Cuántas ruedas hay en 7 bicicletas?', a: 14, why: '7 × 2 = 14' },
    { q: 'Sofía tiene 9 pares de calcetines. ¿Cuántos calcetines tiene?', a: 18, why: '9 × 2 = 18' },
    { q: 'En cada mesa se sientan 2 niños. ¿Cuántos niños caben en 8 mesas?', a: 16, why: '8 × 2 = 16' },
  ],
  3: [
    { q: 'Un triciclo tiene 3 ruedas. ¿Cuántas ruedas tienen 6 triciclos?', a: 18, why: '6 × 3 = 18' },
    { q: 'Cada paquete trae 3 yogures. ¿Cuántos yogures hay en 8 paquetes?', a: 24, why: '8 × 3 = 24' },
    { q: 'Pablo come 3 frutas al día. ¿Cuántas come en 7 días?', a: 21, why: '7 × 3 = 21' },
  ],
  4: [
    { q: 'Un perro tiene 4 patas. ¿Cuántas patas tienen 7 perros?', a: 28, why: '7 × 4 = 28' },
    { q: 'Cada coche tiene 4 ruedas. ¿Cuántas ruedas hay en el aparcamiento si hay 9 coches?', a: 36, why: '9 × 4 = 36' },
    { q: 'Una mesa tiene 4 patas. ¿Cuántas patas tienen las 6 mesas de la clase?', a: 24, why: '6 × 4 = 24' },
  ],
  5: [
    { q: 'Cada mano tiene 5 dedos. ¿Cuántos dedos hay en 8 manos?', a: 40, why: '8 × 5 = 40' },
    { q: 'Un helado cuesta 5 monedas. ¿Cuánto cuestan 7 helados?', a: 35, why: '7 × 5 = 35' },
    { q: 'Ana nada 5 largos cada día. ¿Cuántos largos nada en 9 días?', a: 45, why: '9 × 5 = 45' },
  ],
  6: [
    { q: 'Un insecto tiene 6 patas. ¿Cuántas patas tienen 7 hormigas?', a: 42, why: '7 × 6 = 42' },
    { q: 'Cada caja de huevos tiene 6 huevos. ¿Cuántos huevos hay en 8 cajas?', a: 48, why: '8 × 6 = 48' },
    { q: 'Un dado tiene 6 caras. ¿Cuántas caras tienen 9 dados?', a: 54, why: '9 × 6 = 54' },
  ],
  7: [
    { q: 'Una semana tiene 7 días. ¿Cuántos días son 8 semanas?', a: 56, why: '8 × 7 = 56' },
    { q: 'Cada fila del teatro tiene 7 butacas. ¿Cuántas butacas hay en 6 filas?', a: 42, why: '6 × 7 = 42' },
    { q: 'Luis ahorra 7 monedas cada semana. ¿Cuántas tiene después de 9 semanas?', a: 63, why: '9 × 7 = 63' },
  ],
  8: [
    { q: 'Una araña tiene 8 patas. ¿Cuántas patas tienen 7 arañas?', a: 56, why: '7 × 8 = 56' },
    { q: 'Un pulpo tiene 8 brazos. ¿Cuántos brazos tienen 6 pulpos?', a: 48, why: '6 × 8 = 48' },
    { q: 'Cada caja de colores trae 8 lápices. ¿Cuántos lápices hay en 9 cajas?', a: 72, why: '9 × 8 = 72' },
  ],
  9: [
    { q: 'En cada equipo de béisbol juegan 9 personas. ¿Cuántas juegan en 6 equipos?', a: 54, why: '6 × 9 = 54' },
    { q: 'Una caja tiene 9 bombones. ¿Cuántos bombones hay en 8 cajas?', a: 72, why: '8 × 9 = 72' },
    { q: 'Marta sube 9 escalones en cada piso. ¿Cuántos sube hasta el séptimo piso?', a: 63, why: '7 × 9 = 63' },
  ],
  10: [
    { q: 'Cada paquete tiene 10 cromos. ¿Cuántos cromos hay en 7 paquetes?', a: 70, why: '7 × 10 = 70' },
    { q: 'Tienes 6 billetes de 10. ¿Cuánto dinero tienes?', a: 60, why: '6 × 10 = 60' },
    { q: 'En cada pista de bolos hay 10 pinos. ¿Cuántos pinos hay en 9 pistas?', a: 90, why: '9 × 10 = 90' },
  ],
  11: [
    { q: 'Un equipo de fútbol tiene 11 jugadores en el campo. ¿Cuántos hay en 4 equipos?', a: 44, why: '4 × 11 = 44' },
    { q: 'Cada página del álbum tiene 11 cromos. ¿Cuántos caben en 7 páginas?', a: 77, why: '7 × 11 = 77' },
    { q: 'Un autobús hace 11 paradas en cada viaje. ¿Cuántas paradas hace en 12 viajes?', a: 132, why: '12 × 11 = 132' },
  ],
  12: [
    { q: 'Una docena de huevos son 12. ¿Cuántos huevos hay en 5 docenas?', a: 60, why: '5 × 12 = 60' },
    { q: 'Un año tiene 12 meses. ¿Cuántos meses hay en 8 años?', a: 96, why: '8 × 12 = 96' },
    { q: 'Cada caja trae 12 lápices. ¿Cuántos lápices hay en 7 cajas?', a: 84, why: '7 × 12 = 84' },
  ],
};
