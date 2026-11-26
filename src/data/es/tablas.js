// Contenido de /es/tablas-de-multiplicar/ y de las 13 páginas «tabla del N». Español neutro.
// Cada tabla tiene su truco, los productos que más cuestan y preguntas propias: nada de texto repetido con el número cambiado.

export const TABLES = {
  0: {
    intro: 'La tabla del 0 es la más corta de aprender: cualquier número multiplicado por 0 da 0.',
    trick: [
      'Multiplicar es sumar el mismo número varias veces. 0 × 5 es «cinco veces nada», y 5 × 0 es «el 5 ninguna vez». En los dos casos el resultado es 0.',
      'Un ejemplo de la vida real: si tienes 4 cajas vacías, tienes 4 × 0 = 0 caramelos.',
    ],
    hard: [],
    mistake: 'El error típico es confundirla con la suma: 7 + 0 = 7, pero 7 × 0 = 0.',
    faq: [
      { q: '¿Por qué cualquier número por 0 da 0?', a: 'Porque multiplicar es repetir una suma. Si sumas el 0 tantas veces como quieras, sigues teniendo 0; y si no sumas ninguna vez un número, tampoco tienes nada.' },
      { q: '¿Y 0 entre 0?', a: 'La división entre 0 no está definida. Por eso en la tabla del 0 solo multiplicamos.' },
    ],
  },
  1: {
    intro: 'La tabla del 1 no necesita memoria: cualquier número multiplicado por 1 sigue siendo el mismo número.',
    trick: [
      '1 × 8 es «el 8 una vez», así que es 8. El 1 es el elemento neutro de la multiplicación: no cambia nada.',
      'Sirve para entender qué significa multiplicar: 1 × 3 son 3 objetos, 2 × 3 son dos grupos de 3, y así sucesivamente.',
    ],
    hard: [],
    mistake: 'A veces se confunde con la tabla del 0 y se escribe 1 × 6 = 0 o 1 × 6 = 1. La respuesta es el otro número: 6.',
    faq: [
      { q: '¿Para qué sirve la tabla del 1 si es tan fácil?', a: 'Para entender qué es multiplicar y para comprobar resultados: si dividimos un número entre sí mismo, obtenemos 1.' },
      { q: '¿Qué da 1 × 1?', a: '1 × 1 = 1.' },
    ],
  },
  2: {
    intro: 'Multiplicar por 2 es lo mismo que calcular el doble. Si sabes sumar un número consigo mismo, ya sabes la tabla del 2.',
    trick: [
      '2 × 7 = 7 + 7 = 14. Cada resultado es el doble del número.',
      'Todos los resultados son números pares: terminan en 0, 2, 4, 6 u 8. Si te sale un número impar, revisa la cuenta.',
      'Se puede cantar contando de dos en dos: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.',
    ],
    hard: [[2, 7], [2, 8], [2, 9]],
    mistake: 'El error más frecuente es sumar 2 en lugar de multiplicar: 2 × 8 no es 10 (8 + 2), sino 16 (8 + 8).',
    faq: [
      { q: '¿Cuál es la tabla del 2 completa?', a: '2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, 2 × 4 = 8, 2 × 5 = 10, 2 × 6 = 12, 2 × 7 = 14, 2 × 8 = 16, 2 × 9 = 18 y 2 × 10 = 20.' },
      { q: '¿Por qué todos los resultados son pares?', a: 'Porque un número par es justamente el que se puede repartir en dos grupos iguales, y 2 × n son dos grupos de n.' },
    ],
  },
  3: {
    intro: 'La tabla del 3 se aprende contando de tres en tres y tiene un truco para comprobar si el resultado está bien.',
    trick: [
      'Cuenta de tres en tres: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.',
      'Si sabes la tabla del 2, suma una vez más: 3 × 7 = 2 × 7 + 7 = 14 + 7 = 21.',
      'Para comprobar: suma las cifras del resultado. En la tabla del 3 siempre sale 3, 6 o 9 (por ejemplo, 27 → 2 + 7 = 9; 24 → 2 + 4 = 6).',
    ],
    hard: [[3, 7], [3, 8], [3, 9]],
    mistake: 'Se suele confundir 3 × 8 = 24 con 3 × 7 = 21. Piensa en «3 × 8 = 2 × 8 + 8 = 16 + 8».',
    faq: [
      { q: '¿Cómo memorizar la tabla del 3 rápido?', a: 'Primero cuéntala de tres en tres en voz alta varios días. Después practica salteado: 3 × 7, 3 × 4, 3 × 9… Cinco minutos al día funcionan mejor que una hora el domingo.' },
      { q: '¿Cuánto es 3 × 12?', a: '3 × 12 = 36: es 3 × 10 = 30 más 3 × 2 = 6.' },
    ],
  },
  4: {
    intro: 'La tabla del 4 es la del 2 dos veces: multiplicar por 4 es calcular el doble del doble.',
    trick: [
      'Doble y otra vez doble: 4 × 6 → el doble de 6 es 12 y el doble de 12 es 24.',
      'Todos los resultados son pares, y las terminaciones se repiten: 4, 8, 2, 6, 0, 4, 8, 2, 6, 0.',
    ],
    hard: [[4, 6], [4, 7], [4, 8], [4, 9]],
    mistake: 'El error típico es 4 × 7 = 24 (que es 4 × 6) o 4 × 8 = 36 (que es 4 × 9). Haz el doble del doble para comprobarlo: 7 → 14 → 28.',
    faq: [
      { q: '¿Cuál es la tabla del 4 completa?', a: '4, 8, 12, 16, 20, 24, 28, 32, 36 y 40 (de 4 × 1 a 4 × 10).' },
      { q: '¿Cuánto es 4 × 12?', a: '4 × 12 = 48: el doble de 12 es 24 y el doble de 24 es 48.' },
    ],
  },
  5: {
    intro: 'La tabla del 5 es de las favoritas: todos sus resultados terminan en 0 o en 5, como los minutos del reloj.',
    trick: [
      'Si el número es par, el resultado termina en 0; si es impar, termina en 5: 5 × 6 = 30, 5 × 7 = 35.',
      'Truco de la mitad: multiplica por 10 y divide entre 2. 5 × 8 → 80 → 40.',
      'En el reloj, cada número marca 5 minutos más: el 3 son 15 minutos y el 9 son 45.',
    ],
    hard: [[5, 7], [5, 9]],
    mistake: 'A veces se escribe 5 × 7 = 30 o 40. Recuerda: 7 es impar, así que el resultado termina en 5 → 35.',
    faq: [
      { q: '¿Por qué la tabla del 5 termina siempre en 0 o en 5?', a: 'Porque dos grupos de 5 hacen 10. Con un número par de cincos se forman decenas completas (termina en 0); con uno impar sobra un 5.' },
      { q: '¿Cuánto es 5 × 12?', a: '5 × 12 = 60, igual que los minutos de una hora.' },
    ],
  },
  6: {
    intro: 'La tabla del 6 se construye con la del 5: basta con sumar el número una vez más.',
    trick: [
      '6 × n = 5 × n + n. Por ejemplo, 6 × 7 = 35 + 7 = 42.',
      'Con números pares, el resultado termina en la misma cifra: 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48.',
      'La tabla del 6 es el doble de la del 3: 3 × 8 = 24, así que 6 × 8 = 48.',
    ],
    hard: [[6, 7], [6, 8], [6, 9]],
    mistake: 'Las que más se confunden son 6 × 7 = 42 y 6 × 8 = 48. Usa el truco de los pares: 6 × 8 termina en 8 → 48.',
    faq: [
      { q: '¿Cómo aprender la tabla del 6?', a: 'Aprende primero la del 5 y la del 3. Con ellas, cada resultado del 6 sale sumando una vez más el número o calculando el doble de la tabla del 3.' },
      { q: '¿Cuánto es 6 × 12?', a: '6 × 12 = 72: 6 × 10 = 60 más 6 × 2 = 12.' },
    ],
  },
  7: {
    intro: 'La tabla del 7 tiene fama de ser la más difícil, pero si ya conoces las demás solo te quedan unas pocas multiplicaciones nuevas.',
    trick: [
      'Gracias al orden de los factores, 7 × 3 es lo mismo que 3 × 7. Si sabes las tablas del 2 al 6, ya conoces la mitad de la tabla del 7.',
      'Las nuevas de verdad son solo 7 × 7 = 49, 7 × 8 = 56 y 7 × 9 = 63.',
      'Truco del 5-6-7-8: 56 = 7 × 8. Los cuatro números van seguidos.',
      'Si te bloqueas, divide el 7 en 5 + 2: 7 × 6 = 5 × 6 + 2 × 6 = 30 + 12 = 42.',
    ],
    hard: [[7, 6], [7, 7], [7, 8], [7, 9]],
    mistake: 'Es muy común responder 7 × 8 = 54 o 7 × 8 = 48. 54 es 6 × 9 y 48 es 6 × 8. Recuerda el 5-6-7-8.',
    faq: [
      { q: '¿Por qué la tabla del 7 es la más difícil?', a: 'Porque sus resultados no siguen un patrón tan visible como los del 2, el 5 o el 9, y además se aprende cuando el niño ya maneja números más grandes. Por eso conviene practicarla salteada y poco a poco.' },
      { q: '¿Cuánto es 7 × 12?', a: '7 × 12 = 84: 7 × 10 = 70 más 7 × 2 = 14.' },
    ],
  },
  8: {
    intro: 'Multiplicar por 8 es duplicar tres veces. Con la tabla del 2 y un poco de práctica, la del 8 sale sola.',
    trick: [
      'Doble, doble y doble: 8 × 6 → 12 → 24 → 48.',
      'También vale «por 10 menos dos veces»: 8 × 7 = 70 − 14 = 56.',
      'Las terminaciones bajan de dos en dos: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80 → 8, 6, 4, 2, 0, 8, 6, 4, 2, 0.',
    ],
    hard: [[8, 6], [8, 7], [8, 8], [8, 9]],
    mistake: 'Se mezclan 8 × 7 = 56 y 8 × 8 = 64. 8 × 8 es un cuadrado: 64, como las casillas de un tablero de ajedrez.',
    faq: [
      { q: '¿Cuál es la tabla del 8 completa?', a: '8, 16, 24, 32, 40, 48, 56, 64, 72 y 80 (de 8 × 1 a 8 × 10).' },
      { q: '¿Cuánto es 8 × 12?', a: '8 × 12 = 96: 8 × 10 = 80 más 8 × 2 = 16.' },
    ],
  },
  9: {
    intro: 'La tabla del 9 tiene los trucos más vistosos: se puede hacer con los dedos y sus cifras siempre suman 9.',
    trick: [
      'Con los dedos: extiende las dos manos y baja el dedo del número que multiplicas. Para 9 × 4, baja el cuarto dedo: a la izquierda quedan 3 dedos (decenas) y a la derecha 6 (unidades) → 36.',
      'Las cifras de cada resultado suman 9: 18 (1 + 8), 27, 36, 45, 54, 63, 72, 81.',
      'La cifra de las decenas es una menos que el número: 9 × 7 → empieza por 6 y, para sumar 9, termina en 3 → 63.',
      'O bien «por 10 menos una vez»: 9 × 8 = 80 − 8 = 72.',
    ],
    hard: [[9, 6], [9, 7], [9, 8]],
    mistake: 'Se confunden 9 × 6 = 54 y 9 × 7 = 63, o se escribe 9 × 8 = 81. Comprueba con el truco de las decenas: 9 × 8 empieza por 7 → 72.',
    faq: [
      { q: '¿Cómo es el truco de los dedos de la tabla del 9?', a: 'Pon las dos manos abiertas y baja el dedo que corresponde al número (contando desde la izquierda). Los dedos a la izquierda del dedo bajado son las decenas y los de la derecha, las unidades.' },
      { q: '¿Cuánto es 9 × 12?', a: '9 × 12 = 108: 9 × 10 = 90 más 9 × 2 = 18.' },
    ],
  },
  10: {
    intro: 'La tabla del 10 es la llave de todas las demás: para multiplicar por 10 basta con añadir un 0 al final.',
    trick: [
      '10 × 7 = 70, 10 × 12 = 120. El número se mueve una posición a la izquierda en el sistema decimal: las unidades pasan a ser decenas.',
      'Sirve para calcular otras tablas: 9 × n es 10 × n − n, y 5 × n es la mitad de 10 × n.',
    ],
    hard: [],
    mistake: 'Con números más grandes se olvida el cero o se añaden dos: 10 × 15 = 150, no 15 ni 1500.',
    faq: [
      { q: '¿Por qué multiplicar por 10 añade un cero?', a: 'Porque cada unidad se convierte en una decena. 7 unidades por 10 son 7 decenas, y 7 decenas se escriben 70.' },
      { q: '¿Funciona también con decimales?', a: 'Sí, pero ahí no se añade un cero: la coma se mueve un lugar a la derecha. 2,5 × 10 = 25.' },
    ],
  },
  11: {
    intro: 'La tabla del 11 es muy fácil hasta el 9 y tiene un truco para los números de dos cifras.',
    trick: [
      'Del 1 al 9, se repite la cifra: 11 × 4 = 44, 11 × 7 = 77.',
      'Después: 11 × 10 = 110, 11 × 11 = 121, 11 × 12 = 132.',
      'Truco para números de dos cifras: separa las cifras y pon en medio su suma. 11 × 23 → 2 _ 3 → 2 (2 + 3) 3 = 253.',
    ],
    hard: [[11, 11], [11, 12]],
    mistake: 'El truco de repetir la cifra solo vale hasta el 9: 11 × 12 no es 1212, sino 132.',
    faq: [
      { q: '¿Hay que aprender la tabla del 11 en primaria?', a: 'Depende del país y del colegio. En muchos programas las tablas llegan hasta el 10, y el 11 y el 12 se ven después como ampliación.' },
      { q: '¿Cuánto es 11 × 11?', a: '11 × 11 = 121.' },
    ],
  },
  12: {
    intro: 'La tabla del 12 se calcula combinando la del 10 y la del 2. Es útil en la vida diaria: docenas, meses del año, horas del reloj.',
    trick: [
      '12 × n = 10 × n + 2 × n. Por ejemplo, 12 × 7 = 70 + 14 = 84.',
      'Una docena son 12: tres docenas de huevos son 12 × 3 = 36 huevos.',
      'Los resultados son el doble de la tabla del 6: 6 × 8 = 48, así que 12 × 8 = 96.',
    ],
    hard: [[12, 7], [12, 8], [12, 9], [12, 12]],
    mistake: 'Se suele olvidar sumar la parte del 2: 12 × 8 no es 80 + 8, sino 80 + 16 = 96.',
    faq: [
      { q: '¿Cuál es la tabla del 12 completa?', a: '12, 24, 36, 48, 60, 72, 84, 96, 108 y 120 (de 12 × 1 a 12 × 10); además 12 × 11 = 132 y 12 × 12 = 144.' },
      { q: '¿Cuánto es 12 × 12?', a: '12 × 12 = 144, que también se llama «una gruesa» (doce docenas).' },
    ],
  },
};

export const HUB = {
  order: [
    { tables: [1, 10], text: 'La del 1 y la del 10 casi no necesitan memoria.' },
    { tables: [2, 5], text: 'La del 2 son dobles y la del 5 termina en 0 o en 5.' },
    { tables: [3, 4, 9], text: 'La del 4 es el doble del doble y la del 9 tiene el truco de los dedos.' },
    { tables: [6, 7, 8], text: 'Al final, las que más cuestan. Para entonces ya conoces casi todos sus resultados.' },
  ],
  mistakes: [
    'Sumar en lugar de multiplicar: 7 × 0 = 0 (no 7) y 2 × 8 = 16 (no 10).',
    'Confundir resultados vecinos: 6 × 8 = 48 y 7 × 8 = 56; 6 × 9 = 54 y 7 × 9 = 63.',
    'Recitar la tabla de memoria sin entenderla: el niño sabe decir «siete por ocho» solo si empieza desde 7 × 1. Por eso conviene practicar también salteado.',
  ],
  faq: [
    { q: '¿En qué curso se aprenden las tablas de multiplicar?', a: 'Normalmente entre 2.º y 3.º de primaria (2.º y 3.er grado, 2.º y 3.º básico). Primero se entiende qué es multiplicar con objetos y sumas repetidas, y después se memorizan las tablas.' },
    { q: '¿Hasta qué tabla hay que saber: hasta la del 10 o la del 12?', a: 'En la mayoría de los programas de primaria, hasta la del 10. La del 11 y la del 12 son una ampliación útil, sobre todo para calcular docenas y horas.' },
    { q: '¿Cuánto tiempo al día hay que practicar?', a: 'Mejor poco y a menudo: de 5 a 10 minutos al día. El entrenador guarda en este dispositivo qué multiplicaciones fallan más y te las vuelve a preguntar.' },
    { q: '¿Cuántas multiplicaciones hay que memorizar en realidad?', a: 'La tabla del 1 al 10 tiene 100 casillas, pero 7 × 8 es lo mismo que 8 × 7. Si quitas las tablas del 1 y del 10 y las repetidas, quedan 36 multiplicaciones de verdad.' },
  ],
};
