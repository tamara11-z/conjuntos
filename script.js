document.addEventListener("DOMContentLoaded", function () {

    // Personajes y conjuntos según la narrativa
    const personajes = [
        { nombre: "Antonio", materias: ["H"] },
        { nombre: "Enrique", materias: ["P"] },
        { nombre: "Juan", materias: ["M"] },
        { nombre: "Caspian", materias: ["S", "P", "M"] },
        { nombre: "Aylen", materias: ["P"] },
        { nombre: "Ángela", materias: ["P"] },
        { nombre: "Brenda", materias: ["S"] },
        { nombre: "Marcelo", materias: ["H"] },
        { nombre: "Franco", materias: ["S"] },
        { nombre: "Dylan", materias: ["M"] }
    ];

    // Nombres completos de los conjuntos
    const nombresMaterias = {
        P: "Programación",
        S: "Sistemas Operativos",
        M: "Matemática Discreta",
        H: "Historia de la Ingeniería"
    };

    // Elementos de la página
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

    const resultadoUnion = document.getElementById("union");
    const resultadoInterseccion =
        document.getElementById("interseccion");
    const resultadoDiferencia =
        document.getElementById("diferencia");

    const conclusion = document.getElementById("conclusion");

    // Comprobar que existen los elementos necesarios
    if (!selectorA || !selectorB || !boton) {
        console.error("No se encontraron los elementos del juego.");
        return;
    }

    // Cargar los cuatro conjuntos en los selectores
    function cargarMaterias() {
        selectorA.replaceChildren();
        selectorB.replaceChildren();

        const claves = ["P", "S", "M", "H"];

        for (let i = 0; i < claves.length; i++) {
            const opcionA = document.createElement("option");

            opcionA.value = claves[i];
            opcionA.textContent =
                claves[i] + " - " + nombresMaterias[claves[i]];

            selectorA.appendChild(opcionA);

            const opcionB = document.createElement("option");

            opcionB.value = claves[i];
            opcionB.textContent =
                claves[i] + " - " + nombresMaterias[claves[i]];

            selectorB.appendChild(opcionB);
        }

        selectorA.value = "P";
        selectorB.value = "S";
    }

    // Obtener los personajes que pertenecen a un conjunto
    function obtenerConjunto(materia) {
        const conjunto = [];

        for (let i = 0; i < personajes.length; i++) {
            if (personajes[i].materias.includes(materia)) {
                conjunto.push(personajes[i].nombre);
            }
        }

        return conjunto;
    }

    // Mostrar los personajes en la página
    function mostrarPersonajes(elemento, lista) {
        if (!elemento) {
            return;
        }

        elemento.replaceChildren();

        if (lista.length === 0) {
            elemento.textContent = "Ninguno";
            return;
        }

        for (let i = 0; i < lista.length; i++) {
            const etiqueta = document.createElement("span");

            etiqueta.textContent = lista[i];

            elemento.appendChild(etiqueta);
        }
    }

    // Mostrar todos los personajes del universo
    function mostrarUniverso() {
        const nombres = [];

        for (let i = 0; i < personajes.length; i++) {
            nombres.push(personajes[i].nombre);
        }

        mostrarPersonajes(universo, nombres);
    }

    // Calcular las operaciones entre dos conjuntos
    function calcularConjuntos() {
        const materiaA = selectorA.value;
        const materiaB = selectorB.value;

        // Evitar comparar un conjunto consigo mismo
        if (materiaA === materiaB) {
            if (mensaje) {
                mensaje.textContent =
                    "Selecciona dos conjuntos diferentes.";
            }

            return;
        }

        const conjuntoA = obtenerConjunto(materiaA);
        const conjuntoB = obtenerConjunto(materiaB);

        // Intersección: personajes que están en ambos conjuntos
        const interseccion = conjuntoA.filter(function (personaje) {
            return conjuntoB.includes(personaje);
        });

        // Diferencia A - B: personajes que solo están en A
        const diferenciaA = conjuntoA.filter(function (personaje) {
            return !conjuntoB.includes(personaje);
        });

        // Diferencia B - A: personajes que solo están en B
        const diferenciaB = conjuntoB.filter(function (personaje) {
            return !conjuntoA.includes(personaje);
        });

        // Unión: personajes que están en A o en B
        const union = conjuntoA.concat(
            conjuntoB.filter(function (personaje) {
                return !conjuntoA.includes(personaje);
            })
        );

        // Actualizar los nombres del diagrama
        if (nombreA) {
            nombreA.textContent = "Conjunto " + materiaA;
        }

        if (nombreB) {
            nombreB.textContent = "Conjunto " + materiaB;
        }

        // Mostrar los resultados en el diagrama de Venn
        mostrarPersonajes(soloA, diferenciaA);
        mostrarPersonajes(ambos, interseccion);
        mostrarPersonajes(soloB, diferenciaB);

        // Mostrar la unión y la intersección
        mostrarPersonajes(resultadoUnion, union);
        mostrarPersonajes(resultadoInterseccion, interseccion);

        // Mostrar las diferencias de ambos conjuntos
        if (resultadoDiferencia) {
            resultadoDiferencia.replaceChildren();

            const tituloA = document.createElement("p");

            tituloA.textContent =
                "A - B (Conjunto " + materiaA + " - Conjunto " +
                materiaB + "):";

            resultadoDiferencia.appendChild(tituloA);

            const listaA = document.createElement("div");

            mostrarPersonajes(listaA, diferenciaA);

            resultadoDiferencia.appendChild(listaA);

            const tituloB = document.createElement("p");

            tituloB.textContent =
                "B - A (Conjunto " + materiaB + " - Conjunto " +
                materiaA + "):";

            resultadoDiferencia.appendChild(tituloB);

            const listaB = document.createElement("div");

            mostrarPersonajes(listaB, diferenciaB);

            resultadoDiferencia.appendChild(listaB);
        }

        // Mostrar un resumen de los resultados
        if (mensaje) {
            mensaje.textContent =
                "El conjunto " + materiaA + " tiene " +
                conjuntoA.length + " personajes y el conjunto " +
                materiaB + " tiene " + conjuntoB.length +
                ". Hay " + interseccion.length +
                " personaje(s) en común.";
        }

        // Mostrar una conclusión
        if (conclusion) {
            if (interseccion.length > 0) {
                conclusion.textContent =
                    "Los personajes que pertenecen a ambos conjuntos son: " +
                    interseccion.join(", ") + ".";
            } else {
                conclusion.textContent =
                    "Los conjuntos no tienen personajes en común. " +
                    "La intersección es el conjunto vacío.";
            }
        }
    }

    // Preparar la miniweb
    cargarMaterias();

    mostrarUniverso();

    // Ejecutar los cálculos al pulsar el botón
    boton.addEventListener("click", calcularConjuntos);

    // Mostrar los resultados iniciales
    calcularConjuntos();

});
