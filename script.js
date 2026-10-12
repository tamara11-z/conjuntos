// UNIVERSO DE ESTUDIANTES
// Estos datos son ejemplos y se pueden cambiar por los de Misión VALIS.

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

// OBTENER LOS ELEMENTOS DE LA PÁGINA

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

// MOSTRAR LOS ESTUDIANTES DEL UNIVERSO

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

// CALCULAR LA UNIÓN DE DOS CONJUNTOS

function calcularUnion(conjuntoA, conjuntoB) {
    const union = conjuntoA.slice();

    conjuntoB.forEach(function(estudiante) {
        if (!union.includes(estudiante)) {
            union.push(estudiante);
        }
    });

    return union;
}

// CALCULAR LA INTERSECCIÓN DE DOS CONJUNTOS

function calcularInterseccion(conjuntoA, conjuntoB) {
    const interseccion = [];

    conjuntoA.forEach(function(estudiante) {
        if (conjuntoB.includes(estudiante)) {
            interseccion.push(estudiante);
        }
    });

    return interseccion;
}

// CALCULAR LA DIFERENCIA A - B

function calcularDiferencia(conjuntoA, conjuntoB) {
    const diferencia = [];

    conjuntoA.forEach(function(estudiante) {
        if (!conjuntoB.includes(estudiante)) {
            diferencia.push(estudiante);
        }
    });

    return diferencia;
}

// MOSTRAR LOS ELEMENTOS DE UN CONJUNTO EN LA PÁGINA

function mostrarConjunto(elemento, conjunto) {
    elemento.innerHTML = "";

    if (conjunto.length === 0) {
        elemento.textContent = "Ningún estudiante";
        return;
    }

    conjunto.forEach(function(estudiante) {
        const etiqueta = document.createElement("span");

        etiqueta.className = "alumno";
        etiqueta.textContent = estudiante;

        elemento.appendChild(etiqueta);
    });
}

// MOSTRAR UNA OPERACIÓN Y SU CANTIDAD DE ELEMENTOS

function mostrarResultado(elemento, conjunto) {
    elemento.innerHTML = "";

    const cantidad = document.createElement("p");

    cantidad.textContent =
        "Cantidad de estudiantes: " + conjunto.length;

    elemento.appendChild(cantidad);

    mostrarConjunto(elemento, conjunto);
}

// CALCULAR TODOS LOS CONJUNTOS

function calcularConjuntos() {
    const materiaA = selectorA.value;
    const materiaB = selectorB.value;

    // Obtener los estudiantes que prefieren cada materia.

    const conjuntoA = obtenerConjunto(materiaA);
    const conjuntoB = obtenerConjunto(materiaB);

    // Calcular las tres operaciones.

    const union = calcularUnion(conjuntoA, conjuntoB);

    const interseccion =
        calcularInterseccion(conjuntoA, conjuntoB);

    const diferencia =
        calcularDiferencia(conjuntoA, conjuntoB);

    // Actualizar los nombres del diagrama.

    nombreA.textContent = "A: " + materiaA;
    nombreB.textContent = "B: " + materiaB;

    // Mostrar las regiones del diagrama de Venn.

    const estudiantesSoloA =
        calcularDiferencia(conjuntoA, conjuntoB);

    const estudiantesSoloB =
        calcularDiferencia(conjuntoB, conjuntoA);

    mostrarConjunto(soloA, estudiantesSoloA);
    mostrarConjunto(ambos, interseccion);
    mostrarConjunto(soloB, estudiantesSoloB);

    // Mostrar los resultados de las operaciones.

    mostrarResultado(resultadoUnion, union);

    mostrarResultado(
        resultadoInterseccion,
        interseccion
    );

    mostrarResultado(
        resultadoDiferencia,
        diferencia
    );

    // Mostrar un mensaje con las cantidades obtenidas.

    mensaje.textContent =
        "El conjunto A tiene " + conjuntoA.length +
        " estudiantes y el conjunto B tiene " +
        conjuntoB.length + " estudiantes.";

    // Explicar el resultado de la comparación.

    if (materiaA === materiaB) {
        conclusion.textContent =
            "Elegiste la misma materia para A y B. " +
            "Por eso, ambos conjuntos contienen a los mismos " +
            "estudiantes. La diferencia A − B está vacía.";
    } else {
        conclusion.textContent =
            "Hay " + union.length +
            " estudiantes que prefieren al menos una de las dos " +
            "materias. " + interseccion.length +
            " estudiantes prefieren ambas materias y " +
            diferencia.length +
            " estudiantes prefieren " + materiaA +
            ", pero no " + materiaB + ".";
    }
}

// ACTIVAR EL BOTÓN

botonCalcular.addEventListener("click", calcularConjuntos);

// MOSTRAR LOS DATOS INICIALES

mostrarUniverso();
calcularConjuntos();
