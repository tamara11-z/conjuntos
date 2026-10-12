// UNIVERSO DE ESTUDIANTES
// Cada estudiante tiene un nombre y sus materias preferidas.

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


// OBTENER LOS ELEMENTOS DEL HTML

const selectorA = document.getElementById("materiaA");
const selectorB = document.getElementById("materiaB");
const botonCalcular = document.getElementById("calcular");

const mensaje = document.getElementById("mensaje");
const universo = document.getElementById("universo");

const nombreA = document.getElementById("nombreA");
const nombreB = document.getElementById("nombreB");

const soloA = document.getElementById("soloA");
const ambos = document.getElementById("ambos");
const soloB = document.getElementById("soloB");

const resultadoUnion = document.getElementById("union");
const resultadoInterseccion = document.getElementById("interseccion");
const resultadoDiferencia = document.getElementById("diferencia");

const conclusion = document.getElementById("conclusion");


// MOSTRAR UNA LISTA DE ESTUDIANTES

function mostrarEstudiantes(elemento, lista) {
    elemento.innerHTML = "";

    if (lista.length === 0) {
        elemento.textContent = "Ninguno";
        return;
    }

    lista.forEach(function(estudiante) {
        const etiqueta = document.createElement("span");
        etiqueta.textContent = estudiante.nombre;
        elemento.appendChild(etiqueta);
    });
}


// OBTENER LOS ESTUDIANTES QUE PREFIEREN UNA MATERIA

function obtenerConjunto(materia) {
    return estudiantes.filter(function(estudiante) {
        return estudiante.materias.includes(materia);
    });
}


// CALCULAR LAS OPERACIONES

function calcularConjuntos() {
    const materiaSeleccionadaA = selectorA.value;
    const materiaSeleccionadaB = selectorB.value;

    nombreA.textContent = "A: " + materiaSeleccionadaA;
    nombreB.textContent = "B: " + materiaSeleccionadaB;

    if (materiaSeleccionadaA === materiaSeleccionadaB) {
        mensaje.textContent =
            "Selecciona dos materias diferentes para comparar los conjuntos.";

        return;
    }

    const conjuntoA = obtenerConjunto(materiaSeleccionadaA);
    const conjuntoB = obtenerConjunto(materiaSeleccionadaB);

    // A INTERSECCIÓN B: estudiantes que están en ambos conjuntos.

    const interseccion = conjuntoA.filter(function(estudiante) {
        return conjuntoB.some(function(otro) {
            return otro.nombre === estudiante.nombre;
        });
    });

    // A - B: estudiantes que están en A, pero no en B.

    const diferencia = conjuntoA.filter(function(estudiante) {
        return !conjuntoB.some(function(otro) {
            return otro.nombre === estudiante.nombre;
        });
    });

    // B - A: estudiantes que están en B, pero no en A.

    const diferenciaB = conjuntoB.filter(function(estudiante) {
        return !conjuntoA.some(function(otro) {
            return otro.nombre === estudiante.nombre;
        });
    });

    // UNIÓN: estudiantes que están en A o en B, sin repetir.

    const union = conjuntoA.concat(
        conjuntoB.filter(function(estudiante) {
            return !conjuntoA.some(function(otro) {
                return otro.nombre === estudiante.nombre;
            });
        })
    );

    // MOSTRAR EL UNIVERSO.

    mostrarEstudiantes(universo, estudiantes);

    // MOSTRAR LAS REGIONES DEL DIAGRAMA DE VENN.

    mostrarEstudiantes(soloA, diferencia);
    mostrarEstudiantes(ambos, interseccion);
    mostrarEstudiantes(soloB, diferenciaB);

    // MOSTRAR LOS RESULTADOS DE LAS OPERACIONES.

    mostrarEstudiantes(resultadoUnion, union);
    mostrarEstudiantes(resultadoInterseccion, interseccion);
    mostrarEstudiantes(resultadoDiferencia, diferencia);

    // MOSTRAR UNA CONCLUSIÓN.

    conclusion.innerHTML =
        "<p>El conjunto A, correspondiente a <strong>" +
        materiaSeleccionadaA +
        "</strong>, contiene " + conjuntoA.length +
        " estudiantes.</p>" +

        "<p>El conjunto B, correspondiente a <strong>" +
        materiaSeleccionadaB +
        "</strong>, contiene " + conjuntoB.length +
        " estudiantes.</p>" +

        "<p>La intersección contiene <strong>" +
        interseccion.length +
        "</strong> estudiantes que prefieren ambas materias.</p>" +

        "<p>La unión contiene <strong>" +
        union.length +
        "</strong> estudiantes diferentes.</p>" +

        "<p>La diferencia A − B contiene <strong>" +
        diferencia.length +
        "</strong> estudiantes que prefieren " +
        materiaSeleccionadaA +
        ", pero no " + materiaSeleccionadaB + ".</p>";

    mensaje.textContent = "¡Conjuntos calculados correctamente!";
}


// CONECTAR EL BOTÓN CON LA FUNCIÓN.

botonCalcular.addEventListener("click", calcularConjuntos);


// MOSTRAR LOS ESTUDIANTES AL ABRIR LA PÁGINA.

mostrarEstudiantes(universo, estudiantes);
calcularConjuntos();
