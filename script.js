// UNIVERSO DE ESTUDIANTES
// Datos ficticios para demostrar las operaciones de conjuntos.

const estudiantes = [
    {
        nombre: "Ana",
        materias: ["Matemáticas", "Programación"]
    },
    {
        nombre: "Bruno",
        materias: ["Matemáticas", "Inglés"]
    },
    {
        nombre: "Carla",
        materias: ["Programación", "Inglés"]
    },
    {
        nombre: "Diego",
        materias: ["Matemáticas", "Programación", "Inglés"]
    },
    {
        nombre: "Elena",
        materias: ["Inglés"]
    },
    {
        nombre: "Felipe",
        materias: ["Matemáticas"]
    },
    {
        nombre: "Gabriela",
        materias: ["Programación"]
    },
    {
        nombre: "Hugo",
        materias: ["Matemáticas", "Programación"]
    },
    {
        nombre: "Inés",
        materias: ["Programación", "Inglés"]
    },
    {
        nombre: "José",
        materias: ["Matemáticas", "Inglés"]
    }
];

// ELEMENTOS HTML

const selectorA = document.getElementById("materiaA");
const selectorB = document.getElementById("materiaB");
const botonCalcular = document.getElementById("calcular");

const universo = document.getElementById("universo");
const nombreA = document.getElementById("nombreA");
const nombreB = document.getElementById("nombreB");

const soloA = document.getElementById("soloA");
const ambos = document.getElementById("ambos");
const soloB = document.getElementById("soloB");

const resultadoUnion = document.getElementById("union");
const resultadoInterseccion =
    document.getElementById("interseccion");
const resultadoDiferencia =
    document.getElementById("diferencia");

const mensaje = document.getElementById("mensaje");
const conclusion = document.getElementById("conclusion");

// MOSTRAR EL UNIVERSO

function mostrarUniverso() {
    universo.innerHTML = "";

    estudiantes.forEach(function(estudiante) {
        const etiqueta = document.createElement("span");

        etiqueta.className = "alumno";
        etiqueta.textContent = estudiante.nombre;

        universo.appendChild(etiqueta);
    });
}

// OBTENER UN CONJUNTO SEGÚN LA MATERIA

function obtenerConjunto(materia) {
    const conjunto = [];

    estudiantes.forEach(function(estudiante) {
        if (estudiante.materias.includes(materia)) {
            conjunto.push(estudiante.nombre);
        }
    });

    return conjunto;
}

// UNIÓN: A ∪ B

function calcularUnion(conjuntoA, conjuntoB) {
    const union = conjuntoA.slice();

    conjuntoB.forEach(function(estudiante) {
        if (!union.includes(estudiante)) {
            union.push(estudiante);
        }
    });

    return union;
}

// INTERSECCIÓN: A ∩ B

function calcularInterseccion(conjuntoA, conjuntoB) {
    const interseccion = [];

    conjuntoA.forEach(function(estudiante) {
        if (conjuntoB.includes(estudiante)) {
            interseccion.push(estudiante);
        }
    });

    return interseccion;
}

// DIFERENCIA: A − B

function calcularDiferencia(conjuntoA, conjuntoB) {
    const diferencia = [];

    conjuntoA.forEach(function(estudiante) {
        if (!conjuntoB.includes(estudiante)) {
            diferencia.push(estudiante);
        }
    });

    return diferencia;
}

// MOSTRAR LOS ESTUDIANTES

function mostrarConjunto(elemento, conjunto) {
    elemento.innerHTML = "";

    if (conjunto.length === 0) {
        elemento.textContent = "Conjunto vacío (∅)";
        return;
    }

    conjunto.forEach(function(estudiante) {
        const etiqueta = document.createElement("span");

        etiqueta.className = "alumno";
        etiqueta.textContent = estudiante;

        elemento.appendChild(etiqueta);
    });
}

// MOSTRAR EL RESULTADO Y SU CANTIDAD

function mostrarResultado(elemento, conjunto) {
    elemento.innerHTML = "";

    const cantidad = document.createElement("p");

    cantidad.textContent =
        "Cantidad de estudiantes: " + conjunto.length;

    elemento.appendChild(cantidad);

    mostrarConjunto(elemento, conjunto);
}

// CALCULAR LOS CONJUNTOS

function calcularConjuntos() {
    const materiaA = selectorA.value;
    const materiaB = selectorB.value;

    const conjuntoA = obtenerConjunto(materiaA);
    const conjuntoB = obtenerConjunto(materiaB);

    const union = calcularUnion(conjuntoA, conjuntoB);

    const interseccion =
        calcularInterseccion(conjuntoA, conjuntoB);

    const diferencia =
        calcularDiferencia(conjuntoA, conjuntoB);

    const estudiantesSoloB =
        calcularDiferencia(conjuntoB, conjuntoA);

    // ACTUALIZAR LOS NOMBRES

    nombreA.textContent = "A: " + materiaA;
    nombreB.textContent = "B: " + materiaB;

    // ACTUALIZAR EL DIAGRAMA

    mostrarConjunto(soloA, diferencia);
    mostrarConjunto(ambos, interseccion);
    mostrarConjunto(soloB, estudiantesSoloB);

    // MOSTRAR LAS OPERACIONES

    mostrarResultado(resultadoUnion, union);

    mostrarResultado(
        resultadoInterseccion,
        interseccion
    );

    mostrarResultado(
        resultadoDiferencia,
        diferencia
    );

    // MOSTRAR UN RESUMEN

    mensaje.textContent =
        "A tiene " + conjuntoA.length +
        " estudiantes y B tiene " + conjuntoB.length +
        " estudiantes.";

    // MOSTRAR LA CONCLUSIÓN

    if (materiaA === materiaB) {
        conclusion.textContent =
            "Seleccionaste la misma materia para ambos conjuntos. " +
            "Por eso, A y B tienen los mismos elementos. " +
            "La unión y la intersección son iguales a ese conjunto, " +
            "mientras que A − B es el conjunto vacío.";
    } else {
        conclusion.textContent =
            "La unión contiene " + union.length +
            " estudiantes que prefieren al menos una materia. " +
            "La intersección contiene " + interseccion.length +
            " estudiantes que prefieren ambas. " +
            "La diferencia A − B contiene " + diferencia.length +
            " estudiantes que prefieren " + materiaA +
            ", pero no " + materiaB + ".";
    }
}

// BOTÓN DE CÁLCULO

botonCalcular.addEventListener("click", calcularConjuntos);

// INICIAR LA PÁGINA

mostrarUniverso();
calcularConjuntos();
calcularConjuntos();
