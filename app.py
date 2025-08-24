from flask import Flask, render_template, request, redirect, url_for
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/configurar', methods=['POST'])
def configurar():
    deporte = request.form['deporte']
    
    if deporte == "futbol":
        return render_template('futbol_config.html')
    elif deporte == "tenis":
        return render_template('tenis_config.html')
    elif deporte == "voleibol":
        return render_template('voleibol_config.html')
    else:
        return redirect('/')

@app.route('/guardar_torneo', methods=['POST'])
def guardar_torneo():
    nombre = request.form['nombre']
    deporte = request.form['deporte']
    equipos = int(request.form['equipos'])
    tipo = request.form['tipo']

    return render_template('ingresar_equipos.html', 
                           nombre=nombre, 
                           deporte=deporte, 
                           equipos=equipos, 
                           tipo=tipo)

@app.route('/generar_torneo', methods=['POST'])
def generar_torneo():
    nombre = request.form['nombre']
    deporte = request.form['deporte']
    tipo = request.form['tipo']
    equipos = int(request.form['equipos'])

    lista_equipos = []
    for i in range(equipos):
        nombre_equipo = request.form.get(f'equipo_{i}', '').strip().upper()
        lista_equipos.append(nombre_equipo)


    if tipo == "eliminacion":
        random.shuffle(lista_equipos)  # mezclar para crear cruces aleatorios
        enfrentamientos = []
        for i in range(0, len(lista_equipos), 2):
            if i+1 < len(lista_equipos):
                enfrentamientos.append((lista_equipos[i], lista_equipos[i+1]))
            else:
                enfrentamientos.append((lista_equipos[i], "Descansa"))  # para impar

        return render_template('bracket.html', 
                               nombre=nombre, 
                               enfrentamientos=enfrentamientos)

    elif tipo == "liga":
        partidos = []
        for i in range(len(lista_equipos)):
            for j in range(i+1, len(lista_equipos)):
                partidos.append((lista_equipos[i], lista_equipos[j]))

        return render_template('liga.html', 
                            nombre=nombre, 
                            equipos=lista_equipos, 
                            partidos=partidos)

@app.route('/actualizar_tabla_en_vista', methods=['POST'])
def actualizar_tabla_en_vista():
    nombre = request.form['nombre']
    equipos = [e.upper() for e in request.form.getlist('equipo')]

    tabla = {e: {"puntos": 0, "jugados": 0, "gf": 0, "gc": 0, "dg": 0} for e in equipos}
    partidos = []
    resultados_guardados = []

    i = 0
    while True:
        key = f'partido_{i}'
        if key not in request.form:
            break

        eq1, eq2 = request.form[key].split("::")
        try:
            g1 = int(request.form[f'goles_{i}_1'])
            g2 = int(request.form[f'goles_{i}_2'])
        except:
            g1 = g2 = 0

        partidos.append((eq1, eq2))
        resultados_guardados.append((g1, g2))

        tabla[eq1]['jugados'] += 1
        tabla[eq2]['jugados'] += 1

        tabla[eq1]['gf'] += g1
        tabla[eq1]['gc'] += g2
        tabla[eq2]['gf'] += g2
        tabla[eq2]['gc'] += g1

        tabla[eq1]['dg'] = tabla[eq1]['gf'] - tabla[eq1]['gc']
        tabla[eq2]['dg'] = tabla[eq2]['gf'] - tabla[eq2]['gc']

        if g1 > g2:
            tabla[eq1]['puntos'] += 3
        elif g2 > g1:
            tabla[eq2]['puntos'] += 3
        else:
            tabla[eq1]['puntos'] += 1
            tabla[eq2]['puntos'] += 1

        i += 1

            # Ordenar equipos por puntos y luego por diferencia de gol (y luego goles a favor)
    tabla_ordenada = dict(sorted(
        tabla.items(),
        key=lambda item: (item[1]['puntos'], item[1]['dg'], item[1]['gf']),
        reverse=True
    ))


    return render_template('liga.html', 
                           nombre=nombre, 
                           equipos=equipos, 
                           partidos=partidos,
                           resultados=resultados_guardados,
                           tabla=tabla_ordenada)


# 🔽 Esta parte es la que te hacía falta
if __name__ == '__main__':
    app.run(debug=True)