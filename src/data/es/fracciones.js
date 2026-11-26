// Contenido de /es/fracciones/ (español neutro). Los ejemplos se resuelven con el módulo de matemáticas al compilar.

export const BASE = '/es/fracciones/';

export const PAGES = {
  'calculadora-de-fracciones': {
    nav: 'Calculadora',
    h1: 'Calculadora de fracciones con procedimiento',
    title: 'Calculadora de fracciones paso a paso (con procedimiento)',
    description: 'Suma, resta, multiplica y divide fracciones y números mixtos. La calculadora muestra el procedimiento completo, simplifica el resultado y lo da también como número mixto y decimal.',
    lead: 'Escribe dos fracciones, elige la operación y verás el resultado simplificado con todos los pasos explicados, como se hace en el cuaderno. Acepta números mixtos y negativos.',
    calc: { mode: 'calc', op: '+', a: '2 1/3', b: '3/4' },
    sections: [
      { h: 'Qué hace la calculadora', ul: [
        '<strong>Suma y resta</strong>: busca el denominador común con el mínimo común múltiplo y amplifica cada fracción.',
        '<strong>Multiplicación</strong>: simplifica en cruz antes de multiplicar para trabajar con números pequeños.',
        '<strong>División</strong>: multiplica por la fracción inversa.',
        'Siempre <strong>simplifica</strong> el resultado y, si es una fracción impropia, la escribe también como <strong>número mixto</strong> y en decimal.',
      ] },
      { h: 'Cómo escribir las fracciones', ul: [
        'Arriba va el <strong>numerador</strong> y abajo el <strong>denominador</strong>.',
        'Para un número mixto como 2 ⅓, escribe el 2 en la casilla pequeña de la izquierda, el 1 arriba y el 3 abajo.',
        'Para un número entero, como 5, escribe 5 arriba y 1 abajo.',
        'Para una fracción negativa, pon el signo menos en el numerador: −3/4.',
      ] },
    ],
    faq: [
      { q: '¿La calculadora simplifica el resultado?', a: 'Sí. Siempre divide el numerador y el denominador entre su máximo común divisor, y explica en qué paso lo hace.' },
      { q: '¿Puedo usarla con números mixtos?', a: 'Sí. Escribe la parte entera en la casilla de la izquierda. La calculadora la convierte primero en fracción impropia y lo muestra como un paso más.' },
      { q: '¿Por qué usa el mínimo común múltiplo y no multiplica los denominadores?', a: 'Multiplicar los denominadores también funciona, pero con el mcm los números son más pequeños y hay menos que simplificar al final.' },
    ],
    sheet: { topic: 'fraction', params: { ops: ['+', '-', '*', '/'], maxDen: 10 }, title: 'Operaciones con fracciones' },
  },
  'suma-de-fracciones': {
    nav: 'Suma',
    h1: 'Suma de fracciones',
    title: 'Suma de fracciones: con igual y distinto denominador, paso a paso',
    description: 'Cómo sumar fracciones con el mismo denominador y con distinto denominador, con ejemplos resueltos, errores frecuentes, calculadora paso a paso y ejercicios para imprimir.',
    lead: 'Para sumar fracciones, las dos tienen que estar en las mismas «piezas», es decir, tener el mismo denominador. Si ya lo tienen, se suman los numeradores; si no, primero se busca un denominador común.',
    calc: { mode: 'calc', op: '+', a: '1/4', b: '1/6' },
    sections: [
      { h: 'Fracciones con el mismo denominador', p: ['Se suman los numeradores y se deja el mismo denominador. Si te comes 2 trozos de una pizza cortada en 8 y luego 3 más, te has comido 5 de 8: 2/8 + 3/8 = 5/8.'] },
      { h: 'Fracciones con distinto denominador', ol: [
        'Busca un denominador común: el <a href="/es/mcm-mcd/">mínimo común múltiplo</a> de los denominadores.',
        'Amplifica cada fracción: multiplica su numerador y su denominador por el mismo número, para que el denominador sea el común.',
        'Suma los numeradores y deja el denominador común.',
        'Simplifica el resultado y, si el numerador es mayor que el denominador, pásalo a número mixto.',
      ] },
      { h: 'Ejemplos resueltos', examples: [['1/2', '+', '1/3'], ['3/4', '+', '5/6'], ['1 1/2', '+', '2 2/3']] },
      { h: 'Errores frecuentes', ul: [
        'Sumar los denominadores: 1/2 + 1/3 <strong>no</strong> es 2/5. Medio y un tercio son más que medio, y 2/5 es menos que medio.',
        'Amplificar solo el denominador: si multiplicas abajo, multiplica también arriba por el mismo número.',
        'Olvidar simplificar al final: 3/6 es correcto, pero se espera 1/2.',
      ] },
    ],
    faq: [
      { q: '¿Cómo se suman fracciones con distinto denominador?', a: 'Se busca un denominador común (el mcm de los denominadores), se amplifica cada fracción hasta ese denominador, se suman los numeradores y se simplifica.' },
      { q: '¿Se pueden sumar los denominadores?', a: 'No. El denominador dice en cuántas partes se divide la unidad; al sumar no cambia el tamaño de las partes, solo cuántas tenemos.' },
      { q: '¿Cómo se suman números mixtos?', a: 'Lo más seguro es convertirlos en fracciones impropias, sumarlos como fracciones y, al final, volver a escribir el resultado como número mixto.' },
    ],
    sheet: { topic: 'fraction', params: { ops: ['+'], maxDen: 10 }, title: 'Suma de fracciones' },
  },
  'resta-de-fracciones': {
    nav: 'Resta',
    h1: 'Resta de fracciones',
    title: 'Resta de fracciones: con igual y distinto denominador, paso a paso',
    description: 'Cómo restar fracciones con el mismo y con distinto denominador, con números mixtos y resultados negativos. Ejemplos resueltos, calculadora paso a paso y ejercicios para imprimir.',
    lead: 'La resta de fracciones sigue las mismas reglas que la suma: con el mismo denominador se restan los numeradores; con distinto denominador, primero hay que igualarlos.',
    calc: { mode: 'calc', op: '-', a: '5/6', b: '1/4' },
    sections: [
      { h: 'Fracciones con el mismo denominador', p: ['Se restan los numeradores y se deja el denominador: 7/10 − 3/10 = 4/10, que simplificado es 2/5.'] },
      { h: 'Fracciones con distinto denominador', ol: [
        'Calcula el <a href="/es/mcm-mcd/">mínimo común múltiplo</a> de los denominadores.',
        'Amplifica las dos fracciones hasta ese denominador.',
        'Resta los numeradores y deja el denominador común.',
        'Simplifica. Si la primera fracción era menor, el resultado será negativo.',
      ] },
      { h: 'Ejemplos resueltos', examples: [['3/4', '-', '1/3'], ['2/5', '-', '7/10'], ['3 1/4', '-', '1 2/3']] },
      { h: 'Errores frecuentes', ul: [
        'Restar también los denominadores: 3/4 − 1/4 es 2/4, no 2/0.',
        'En números mixtos, restar las partes enteras y las fracciones por separado cuando la segunda fracción es mayor (3 ¼ − 1 ⅔). Es más seguro pasar todo a fracción impropia.',
        'Perder el signo cuando el resultado es negativo: 1/3 − 1/2 = −1/6.',
      ] },
    ],
    faq: [
      { q: '¿Cómo se restan fracciones con distinto denominador?', a: 'Igual que en la suma: se iguala el denominador con el mcm, se amplifica cada fracción y se restan los numeradores.' },
      { q: '¿Qué pasa si la segunda fracción es mayor?', a: 'El resultado es negativo. Por ejemplo, 2/5 − 7/10 = 4/10 − 7/10 = −3/10.' },
      { q: '¿Cómo se resta una fracción a un número entero?', a: 'Escribe el entero como fracción con el mismo denominador: 2 − 3/4 = 8/4 − 3/4 = 5/4 = 1 ¼.' },
    ],
    sheet: { topic: 'fraction', params: { ops: ['-'], maxDen: 10 }, title: 'Resta de fracciones' },
  },
  'multiplicacion-de-fracciones': {
    nav: 'Multiplicación',
    h1: 'Multiplicación de fracciones',
    title: 'Multiplicación de fracciones: regla, ejemplos y ejercicios',
    description: 'Cómo multiplicar fracciones: numerador por numerador y denominador por denominador, cómo simplificar en cruz, multiplicar por un entero y por números mixtos. Calculadora y ejercicios.',
    lead: 'Multiplicar fracciones es la operación más directa: no hace falta denominador común. Se multiplica numerador por numerador y denominador por denominador.',
    calc: { mode: 'calc', op: '*', a: '4/9', b: '3/8' },
    sections: [
      { h: 'La regla', p: ['a/b × c/d = (a × c)/(b × d). Por ejemplo, 2/3 × 4/5 = 8/15.', 'Multiplicar por una fracción es tomar «una parte de»: 1/2 × 3/4 es la mitad de tres cuartos, es decir, 3/8.'] },
      { h: 'Simplificar en cruz', p: ['Antes de multiplicar, puedes dividir un numerador y el denominador de la <em>otra</em> fracción entre un mismo número. En 4/9 × 3/8, el 4 y el 8 se dividen entre 4, y el 3 y el 9 entre 3: queda 1/3 × 1/2 = 1/6. El resultado es el mismo, pero sin números grandes.'] },
      { h: 'Ejemplos resueltos', examples: [['2/3', '*', '4/5'], ['5/6', '*', '9/10'], ['3', '*', '2/7'], ['1 1/2', '*', '2 2/3']] },
      { h: 'Errores frecuentes', ul: [
        'Buscar denominador común: en la multiplicación no hace falta.',
        'Multiplicar un entero por el numerador y también por el denominador: 3 × 2/7 = 6/7, no 6/21.',
        'Multiplicar números mixtos parte por parte: 1 ½ × 2 ⅔ no es 2 ⅓. Primero se convierten en fracciones impropias.',
      ] },
    ],
    faq: [
      { q: '¿Cómo se multiplican fracciones?', a: 'Se multiplica numerador por numerador y denominador por denominador, y luego se simplifica el resultado.' },
      { q: '¿Cómo se multiplica una fracción por un número entero?', a: 'Se multiplica el entero por el numerador y se deja el denominador: 3 × 2/7 = 6/7.' },
      { q: '¿Por qué al multiplicar dos fracciones el resultado es más pequeño?', a: 'Cuando las dos son menores que 1, tomas una parte de una parte, así que el resultado es menor que cada una.' },
    ],
    sheet: { topic: 'fraction', params: { ops: ['*'], maxDen: 10 }, title: 'Multiplicación de fracciones' },
  },
  'division-de-fracciones': {
    nav: 'División',
    h1: 'División de fracciones',
    title: 'División de fracciones: método de la inversa y en cruz, paso a paso',
    description: 'Cómo dividir fracciones multiplicando por la inversa o en cruz, dividir entre un entero y con números mixtos. Ejemplos resueltos, calculadora paso a paso y ejercicios para imprimir.',
    lead: 'Para dividir fracciones se multiplica la primera por la inversa de la segunda: se le da la vuelta a la segunda fracción y se multiplica.',
    calc: { mode: 'calc', op: '/', a: '2/3', b: '4/5' },
    sections: [
      { h: 'Método de la inversa', ol: ['Deja la primera fracción como está.', 'Cambia la división por una multiplicación.', 'Da la vuelta a la segunda fracción (su inversa).', 'Multiplica y simplifica.'] },
      { h: 'Multiplicación en cruz', p: ['Es el mismo método escrito de otra forma, muy usado en Latinoamérica: el numerador del resultado es el numerador de la primera por el denominador de la segunda, y el denominador es el denominador de la primera por el numerador de la segunda. 2/3 ÷ 4/5 = (2 × 5)/(3 × 4) = 10/12 = 5/6.'] },
      { h: 'Ejemplos resueltos', examples: [['3/4', '/', '1/2'], ['5/8', '/', '5/6'], ['6/7', '/', '3'], ['2 1/4', '/', '1 1/2']] },
      { h: 'Errores frecuentes', ul: [
        'Dar la vuelta a la primera fracción en lugar de la segunda.',
        'Dividir entre un entero sin escribirlo como fracción: 6/7 ÷ 3 = 6/7 × 1/3 = 2/7.',
        'Dividir entre 0: no se puede, y una fracción con numerador 0 vale 0.',
      ] },
    ],
    faq: [
      { q: '¿Cómo se dividen fracciones?', a: 'Se multiplica la primera fracción por la inversa de la segunda. Por ejemplo, 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2.' },
      { q: '¿Por qué se le da la vuelta a la segunda fracción?', a: 'Dividir entre un número es multiplicar por su inverso, igual que dividir entre 2 es multiplicar por 1/2. La inversa de 4/5 es 5/4.' },
      { q: '¿El resultado de dividir fracciones puede ser mayor que las dos?', a: 'Sí. Al dividir entre una fracción menor que 1, el resultado crece: 3/4 ÷ 1/2 = 1 ½, porque en tres cuartos caben un medio y otra mitad de medio.' },
    ],
    sheet: { topic: 'fraction', params: { ops: ['/'], maxDen: 10 }, title: 'División de fracciones' },
  },
  'fracciones-equivalentes': {
    nav: 'Equivalentes',
    h1: 'Fracciones equivalentes',
    title: 'Fracciones equivalentes: qué son, cómo hallarlas y comprobarlas',
    description: 'Qué son las fracciones equivalentes, cómo obtenerlas amplificando y simplificando, y cómo comprobar si dos fracciones son equivalentes con la multiplicación en cruz. Con comprobador y ejercicios.',
    lead: 'Dos fracciones son equivalentes cuando representan la misma cantidad aunque se escriban con números distintos: 1/2, 2/4 y 4/8 son la misma mitad.',
    calc: { mode: 'equiv', a: '2/3', b: '8/12' },
    sections: [
      { h: 'Cómo obtener fracciones equivalentes', ul: [
        '<strong>Amplificando</strong>: multiplica el numerador y el denominador por el mismo número. 2/3 → 4/6 → 6/9 → 8/12.',
        '<strong>Simplificando</strong>: divide los dos entre un divisor común. 8/12 → 4/6 → 2/3.',
      ] },
      { h: 'Cómo comprobar si dos fracciones son equivalentes', p: ['Multiplica en cruz: el numerador de cada una por el denominador de la otra. Si salen productos iguales, son equivalentes. Para 2/3 y 8/12: 2 × 12 = 24 y 3 × 8 = 24, así que sí lo son.'] },
      { h: 'Errores frecuentes', ul: [
        'Sumar el mismo número arriba y abajo: 1/2 y 2/3 <strong>no</strong> son equivalentes. Hay que multiplicar o dividir.',
        'Multiplicar solo el numerador o solo el denominador.',
      ] },
    ],
    faq: [
      { q: '¿Cuántas fracciones equivalentes tiene una fracción?', a: 'Infinitas: puedes multiplicar numerador y denominador por 2, por 3, por 4 y así sucesivamente.' },
      { q: '¿Qué es la fracción irreducible?', a: 'Es la fracción equivalente más simple: la que ya no se puede simplificar porque numerador y denominador no tienen divisores comunes aparte del 1.' },
    ],
    sheet: { topic: 'simplify', params: { maxDen: 12, maxFactor: 6 }, title: 'Fracciones equivalentes: escribe la irreducible' },
  },
  'simplificar-fracciones': {
    nav: 'Simplificar',
    h1: 'Simplificar fracciones',
    title: 'Simplificar fracciones: cómo llegar a la fracción irreducible',
    description: 'Cómo simplificar fracciones dividiendo entre el máximo común divisor o paso a paso con divisores pequeños. Simplificador con procedimiento, reglas de divisibilidad y ejercicios para imprimir.',
    lead: 'Simplificar una fracción es escribirla con números más pequeños sin cambiar su valor. Se divide el numerador y el denominador entre un mismo número hasta que ya no se pueda más.',
    calc: { mode: 'simplify', a: '36/48' },
    sections: [
      { h: 'Dos maneras de simplificar', ul: [
        '<strong>De una vez</strong>: divide entre el <a href="/es/mcm-mcd/">máximo común divisor</a>. 36/48: mcd(36, 48) = 12, así que 36/48 = 3/4.',
        '<strong>Poco a poco</strong>: divide entre 2, 3, 5… mientras se pueda. 36/48 → 18/24 → 9/12 → 3/4.',
      ] },
      { h: 'Reglas de divisibilidad que ayudan', ul: [
        'Entre <strong>2</strong>: el número termina en cifra par.',
        'Entre <strong>3</strong>: la suma de sus cifras es múltiplo de 3 (45 → 4 + 5 = 9).',
        'Entre <strong>5</strong>: termina en 0 o en 5.',
        'Entre <strong>10</strong>: termina en 0; tacha un cero arriba y otro abajo.',
      ] },
      { h: 'Errores frecuentes', ul: [
        'Dividir solo el numerador o solo el denominador.',
        'Restar en vez de dividir: 6/8 no se simplifica a 4/6.',
        'Parar antes de tiempo: 18/24 está simplificada a medias; la irreducible es 3/4.',
      ] },
    ],
    faq: [
      { q: '¿Cuándo está simplificada del todo una fracción?', a: 'Cuando el numerador y el denominador no tienen ningún divisor común aparte del 1. Se dice que es irreducible.' },
      { q: '¿Se simplifica igual una fracción impropia?', a: 'Sí: 18/12 se simplifica a 3/2, y después se puede escribir como número mixto, 1 ½.' },
    ],
    sheet: { topic: 'simplify', params: { maxDen: 12, maxFactor: 8 }, title: 'Simplificar fracciones' },
  },
};

export const ORDER = ['calculadora-de-fracciones', 'suma-de-fracciones', 'resta-de-fracciones', 'multiplicacion-de-fracciones', 'division-de-fracciones', 'fracciones-equivalentes', 'simplificar-fracciones'];
