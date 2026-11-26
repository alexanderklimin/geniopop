# Cluster Keyword Planner ideas (kids_math.json + kids_sci.json) per market; dedupe close variants by (volume, bid) inside a cluster.
import json, re, os, sys
D = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(D, "kids_math.json")))
sci = json.load(open(os.path.join(D, "kids_sci.json")))
for m in sci: data[m] = data.get(m, []) + sci[m]
C = {
 "es": [("tabla del N", r"\btabla del? \d+|tablas? del \d+"), ("tablas de multiplicar", r"tablas? (de )?multiplicar|tabla pitag|multiplicaci"),
        ("fracciones", r"fracci|numerador|denominador"), ("porcentaje", r"porcent"), ("mcm/mcd", r"comun multiplo|comun divisor|divisor comun|\bmcm\b|\bmcd\b"),
        ("raíz/potencias", r"raiz|potenci|exponen"), ("números romanos", r"romanos"), ("división", r"divisi|dividir"), ("sumas y restas", r"\bsumas?\b|\brestas?\b"),
        ("problemas", r"problema"), ("operaciones combinadas", r"operaciones combinadas|jerarquia"), ("juegos", r"juego"), ("fichas/imprimir", r"ficha|imprimir|ejercicio|cuadernillo"),
        ("por curso", r"primaria|grado|\d+ ?(o|º)? (de )?primaria|preescolar|kinder|secundaria"), ("cálculo mental", r"calculo mental"),
        ("experimentos", r"experiment|feria de (la )?ciencia|volcan"), ("slime", r"slime|eslain|moco"), ("acertijos/lógica", r"acertij|logica|reto|desafio|adivinanz|sudoku")],
 "pt": [("tabuada", r"tabuada"), ("atividades/imprimir", r"atividade|exercicio|exercício|imprimir"), ("alfabetização/infantil", r"alfabetiza|educação infantil|vogais|alfabeto"),
        ("frações", r"fra[cç]"), ("continhas/divisão", r"continha|divis"), ("romanos", r"romanos"), ("mmc", r"\bmmc\b|\bmdc\b"), ("jogos", r"jogo"),
        ("charadas/enigmas", r"charada|enigma|desafio|logica|lógica"), ("experiências", r"experi[eê]ncia|experimento|feira de ci|vulc"), ("slime", r"slime|geleca")],
 "en": [("brands (coolmath/prodigy/abcya…)", r"cool ?math|co0ol|c0ool|prodigy|abcya|math ?play ?ground|maths play|khan|splash|ixl"), ("times tables", r"times? tables?|multiplication|table \d|tables \d"),
        ("calculators", r"calculator|calc\b|finder"), ("roman numerals", r"roman"), ("fractions", r"fraction"), ("worksheets", r"worksheet|printable"), ("math games", r"math.*game|game.*math"),
        ("educational games", r"educational|learning games|kids games|classroom"), ("science fair/experiments", r"science|stem|experiment|volcano"), ("slime", r"slime"), ("riddles/puzzles", r"riddle|puzzle|brain|teaser|sudoku|trick")],
 "ru": [("таблица умножения", r"умнож"), ("по классам", r"клас"), ("дроби", r"дроб"), ("деление столбиком", r"столбик"), ("римские цифры", r"римск|латин|араб"),
        ("задачи/примеры", r"задач|пример"), ("гдз/егэ/огэ/зно", r"гдз|егэ|огэ|зно"), ("игры", r"игр")],
}
for m, rules in C.items():
    rows = data.get(m, [])
    print(f"\n=== {m}: ideas {len(rows)}")
    out = []
    for name, rx in rules:
        seen, tot, top = set(), 0, []
        for x in rows:
            if re.search(rx, x["k"]):
                key = (x["v"], x["hi"])
                if key in seen: continue
                seen.add(key); tot += x["v"]; top.append(x)
        out.append((tot, name, top[:4]))
    for tot, name, top in sorted(out, reverse=True):
        print(f"{name:32s} ~{tot:>10,}  | " + "; ".join(f"{t['k']} {t['v']:,} ${t['hi']}" for t in top))
