document.addEventListener("DOMContentLoaded", function () {

    // Personajes y materias relacionadas con sus narrativas
    const personajes = [
        { nombre: "Antonio", materias: ["P"] },
        { nombre: "Enrique", materias: ["P"] },
        { nombre: "Juan", materias: ["M"] },
        { nombre: "Caspian", materias: ["S", "P", "M"] },
        { nombre: "Aylen", materias: ["P"] },
        { nombre: "Ángela", materias: ["P"] },
        { nombre: "Brenda", materias: ["S"] },
        { nombre: "Marcelo", materias: ["M"] },
        { nombre: "Franco", materias: ["S"] },
        { nombre: "Dylan", materias: ["M"] }
    ];

    const nombresMaterias = {
        P: "Programación",
        S: "Sistemas Operativos",
        M: "Matemática Discreta"
    };

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

    if (!selectorA || !selectorB || !boton) {
        console.error("No se encontraron los elementos del juego.");
        return;
    }

    // Cargar las tres materias en los selectores
    function cargarMaterias() {
        selectorA.replaceChildren();
        selectorB.replaceChildren();

        const claves = ["P", "S", "M"];

        for (let i = 0; i < claves.length; i++) {
            const opcionA = document.createElement("option");
            opcionA.value = claves[i];
            opcionA.textContent =
                claves[i] + " - " + nombresMaterias[claves[i]];

            const opcionB = document.createElement("option");
            opcionB.value = claves[i];
            opcionB.textContent =
                claves[i] + " - " + nombresMaterias[claves[i]];

            selectorA.appendChild(opcionA);
            selectorB.appendChild(opcionB);
        }

        selectorA.value = "P";
        selectorB.value = "S";
    }

    // Obtener los personajes de una materia
    function obtenerConjunto(materia) {
        const conjunto = [];

        for (let i = 0; i < personajes.length; i++) {
            if (personajes[i].materias.includes(materia)) {
                conjunto.push(personajes[i].nombre);
            }
        }

        return conjunto;
    }

    // Mostrar una lista de personajes
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

    // Calcular las operaciones entre conjuntos
    function calcularConjuntos() {
        const materiaA = selectorA.value;
        const materiaB = selectorB.value;

        if (materiaA === materiaB) {
            if (mensaje) {
                mensaje.textContent =
                    "Selecciona dos materias diferentes.";
            }
            return;
        }

        const conjuntoA = obtenerConjunto(materiaA);
        const conjuntoB = obtenerConjunto(materiaB);

        // Intersección: personajes que están en ambos conjuntos
        const interseccion = conjuntoA.filter(function (personaje) {
            return conjuntoB.includes(personaje);
        });

        // Diferencia A - B
        const diferenciaA = conjuntoA.filter(function (personaje) {
            return !conjuntoB.includes(personaje);
        });

        // Diferencia B - A
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
            nombreA.textContent =
                materiaA + " - " + nombresMaterias[materiaA];
        }

        if (nombreB) {
            nombreB.textContent =
                materiaB + " - " + nombresMaterias[materiaB];
        }

        // Mostrar los resultados en el diagrama de Venn
        mostrarPersonajes(soloA, diferenciaA);
        mostrarPersonajes(ambos, interseccion);
        mostrarPersonajes(soloB, diferenciaB);

        mostrarPersonajes(resultadoUnion, union);
        mostrarPersonajes(resultadoInterseccion, interseccion);

        // Mostrar las dos diferencias
        if (resultadoDiferencia) {
            resultadoDiferencia.replaceChildren();

            const tituloA = document.createElement("p");
            tituloA.textContent = materiaA + " - " + materiaB +
                " (A - B):";
            resultadoDiferencia.appendChild(tituloA);

            const listaA = document.createElement("div");
            mostrarPersonajes(listaA, diferenciaA);
            resultadoDiferencia.appendChild(listaA);

            const tituloB = document.createElement("p");
            tituloB.textContent = materiaB + " - " + materiaA +
                " (B - A):";
            resultadoDiferencia.appendChild(tituloB);

            const listaB = document.createElement("div");
            mostrarPersonajes(listaB, diferenciaB);
            resultadoDiferencia.appendChild(listaB);
        }

        // Mostrar un mensaje con los resultados
        if (mensaje) {
            mensaje.textContent =
                "Conjunto A: " + conjuntoA.length +
                " personajes. Conjunto B: " + conjuntoB.length +
                " personajes. En común: " + interseccion.length + ".";
        }

        // Explicar la intersección
        if (conclusion) {
            if (interseccion.length > 0) {
                conclusion.textContent =
                    "Los personajes que pertenecen a ambas materias son: " +
                    interseccion.join(", ") + ".";
            } else {
                conclusion.textContent =
                    "No hay personajes en común entre estas materias. " +
                    "La intersección es el conjunto vacío.";
            }
        }
    }

    // Preparar y ejecutar el juego
    cargarMaterias();
    mostrarUniverso();

    boton.addEventListener("click", calcularConjuntos);

    calcularConjuntos();

});
