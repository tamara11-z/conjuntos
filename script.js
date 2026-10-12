// UNIVERSO DE ESTUDIANTES

const estudiantes = [
    { nombre: "Ana", materias: ["Matemáticas", "Programación"] },
    { nombre: "Luis", materias: ["Matemáticas"] },
    { nombre: "María", materias: ["Programación", "Inglés"] },
    { nombre: "Carlos", materias: ["Matemáticas", "Inglés"] },
    { nombre: "Sofía", materias: ["Programación"] },
    { nombre: "Pedro", materias: ["Inglés"] },
    { nombre: "Lucía", materias: ["Matemáticas", "Programación"] },
    { nombre: "Diego", materias: ["Matemáticas", "Inglés"] },
    { nombre: "Elena", materias: ["Programación", "Inglés"] },
    { nombre: "Mateo", materias: ["Matemáticas"] }
];


// ESPERAR A QUE SE CARGUE EL HTML

document.addEventListener("DOMContentLoaded", function () {

    const selectorA = document.getElementById("materiaA");
    const selectorB = document.getElementById("materiaB");
    const boton = document.getElementById("calcular");

    const mensaje = document.getElementById("mensaje");
    const universo = document.getElementById("universo");

    const nombreA = document.getElementById("nombreA");
    const nombreB = document.getElementById("nombreB");

    const soloA = document.getElementById("soloA");
    const ambos = document.getElementById("ambos");
    const soloB = document.getElementById("soloB");

    const unionHTML = document.getElementById("union");
    const interseccionHTML = document.getElementById("interseccion");
    const diferenciaHTML = document.getElementById("diferencia");

    const conclusion = document.getElementById("conclusion");


    // MOSTRAR LOS ESTUDIANTES EN UNA REGIÓN

    function mostrarEstudiantes(elemento, lista) {
        elemento.replaceChildren();

        if (lista.length === 0) {
            elemento.textContent = "Ninguno";
            return;
        }

        lista.forEach(function (estudiante) {
            const etiqueta = document.createElement("span");
            etiqueta.textContent = estudiante.nombre;
            elemento.appendChild(etiqueta);
        });
    }


    // OBTENER LOS ESTUDIANTES QUE PREFIEREN UNA MATERIA

    function obtenerConjunto(materia) {
        return estudiantes.filter(function (estudiante) {
            return estudiante.materias.includes(materia);
        });
    }


    // CALCULAR LOS CONJUNTOS

    function calcularConjuntos() {

        const materiaA = selectorA.value;
        const materiaB = selectorB.value;

        nombreA.textContent = "A: " + materiaA;
        nombreB.textContent = "B: " + materiaB;

        if (materiaA === materiaB) {
            mensaje.textContent =
                "Elige dos materias diferentes para comparar los conjuntos.";
            return;
        }

        const conjuntoA = obtenerConjunto(materiaA);
        const conjuntoB = obtenerConjunto(materiaB);

        // INTERSECCIÓN: estudiantes que están en A y en B.

        const interseccion = conjuntoA.filter(function (estudiante) {
            return conjuntoB.some(function (otro) {
                return otro.nombre === estudiante.nombre;
            });
        });

        // DIFERENCIA A - B: estudiantes que solo están en A.

        const diferencia = conjuntoA.filter(function (estudiante) {
            return !conjuntoB.some(function (otro) {
                return otro.nombre === estudiante.nombre;
            });
        });

        // DIFERENCIA B - A: estudiantes que solo están en B.

        const diferenciaB = conjuntoB.filter(function (estudiante) {
            return !conjuntoA.some(function (otro) {
                return otro.nombre === estudiante.nombre;
            });
        });

        // UNIÓN: estudiantes de A o B, sin duplicados.

        const union = conjuntoA.concat(diferenciaB);

        // ACTUALIZAR EL UNIVERSO.

        mostrarEstudiantes(universo, estudiantes);

        // ACTUALIZAR EL DIAGRAMA DE VENN.

        mostrarEstudiantes(soloA, diferencia);
        mostrarEstudiantes(ambos, interseccion);
        mostrarEstudiantes(soloB, diferenciaB);

        // MOSTRAR LOS RESULTADOS.

        mostrarEstudiantes(unionHTML, union);
        mostrarEstudiantes(interseccionHTML, interseccion);
        mostrarEstudiantes(diferenciaHTML, diferencia);

        // MOSTRAR LA CONCLUSIÓN.

        conclusion.replaceChildren();

        const textos = [
            "El conjunto A (" + materiaA + ") contiene " +
                conjuntoA.length + " estudiantes.",

            "El conjunto B (" + materiaB + ") contiene " +
                conjuntoB.length + " estudiantes.",

            "La unión A ∪ B contiene " + union.length +
                " estudiantes diferentes.",

            "La intersección A ∩ B contiene " +
                interseccion.length +
                " estudiantes que prefieren ambas materias.",

            "La diferencia A − B contiene " +
                diferencia.length +
                " estudiantes que prefieren " + materiaA +
                ", pero no " + materiaB + "."
        ];

        textos.forEach(function (texto) {
            const parrafo = document.createElement("p");
            parrafo.textContent = texto;
            conclusion.appendChild(parrafo);
        });

        mensaje.textContent = "¡Conjuntos calculados correctamente!";
    }


    // CONECTAR EL BOTÓN CON EL CÁLCULO.

    boton.addEventListener("click", calcularConjuntos);

    // MOSTRAR LOS RESULTADOS INICIALES.

    mostrarEstudiantes(universo, estudiantes);
    calcularConjuntos();

});
