document.addEventListener("DOMContentLoaded", function () {

    // Personajes y sus materias favoritas
    const personajes = [
        {
            nombre: "Antonio",
            materias: ["Historia de la Ingeniería"]
        },
        {
            nombre: "Enrique",
            materias: ["Programación"]
        },
        {
            nombre: "Juan",
            materias: ["Matemática Discreta"]
        },
        {
            nombre: "Caspian",
            materias: ["Sistemas Operativos"]
        },
        {
            nombre: "Aylen",
            materias: ["Programación"]
        },
        {
            nombre: "Ángela",
            materias: ["Programación"]
        },
        {
            nombre: "Brenda",
            materias: ["Sistemas Operativos"]
        },
        {
            nombre: "Marcelo",
            materias: ["Historia de la Ingeniería"]
        },
        {
            nombre: "Franco",
            materias: ["Sistemas Operativos"]
        },
        {
            nombre: "Dylan",
            materias: ["Matemática Discreta"]
        }
    ];

    // Materias disponibles para formar los conjuntos
    const materias = [
        "Historia de la Ingeniería",
        "Programación",
        "Matemática Discreta",
        "Sistemas Operativos"
    ];

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
    const resultadoInterseccion = document.getElementById("interseccion");
    const resultadoDiferencia = document.getElementById("diferencia");

    const conclusion = document.getElementById("conclusion");

    // Comprobar que los elementos necesarios existen
    if (!selectorA || !selectorB || !boton) {
        console.error("No se encontraron los selectores o el botón.");
        return;
    }

    // Cargar las materias en los dos selectores
    function cargarMaterias() {
        selectorA.replaceChildren();
        selectorB.replaceChildren();

        for (let i = 0; i < materias.length; i++) {
            const opcionA = document.createElement("option");
            opcionA.value = materias[i];
            opcionA.textContent = materias[i];
            selectorA.appendChild(opcionA);

            const opcionB = document.createElement("option");
            opcionB.value = materias[i];
            opcionB.textContent = materias[i];
            selectorB.appendChild(opcionB);
        }

        selectorA.value = "Programación";
        selectorB.value = "Sistemas Operativos";
    }

    // Obtener los personajes que pertenecen a una materia
    function obtenerConjunto(materia) {
        const conjunto = [];

        for (let i = 0; i < personajes.length; i++) {
            if (personajes[i].materias.includes(materia)) {
                conjunto.push(personajes[i].nombre);
            }
        }

        return conjunto;
    }

    // Mostrar una lista de personajes en la página
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

    // Mostrar los diez personajes del universo
    function mostrarUniverso() {
        mostrarPersonajes(
            universo,
            personajes.map(function (personaje) {
                return personaje.nombre;
            })
        );
    }

    // Calcular los conjuntos seleccionados
    function calcularConjuntos() {
        const materiaSeleccionadaA = selectorA.value;
        const materiaSeleccionadaB = selectorB.value;

        // No permitir seleccionar la misma materia dos veces
        if (materiaSeleccionadaA === materiaSeleccionadaB) {
            if (mensaje) {
                mensaje.textContent =
                    "Selecciona dos materias diferentes para comparar los conjuntos.";
            }

            return;
        }

        const conjuntoA = obtenerConjunto(materiaSeleccionadaA);
        const conjuntoB = obtenerConjunto(materiaSeleccionadaB);

        // Intersección: personajes que están en ambos conjuntos
        const interseccion = conjuntoA.filter(function (personaje) {
            return conjuntoB.includes(personaje);
        });

        // Diferencia A - B: personajes que están solo en A
        const diferenciaA = conjuntoA.filter(function (personaje) {
            return !conjuntoB.includes(personaje);
        });

        // Diferencia B - A: personajes que están solo en B
        const diferenciaB = conjuntoB.filter(function (personaje) {
            return !conjuntoA.includes(personaje);
        });

        // Unión: personajes que están en A o en B, sin repetir
        const union = conjuntoA.concat(
            conjuntoB.filter(function (personaje) {
                return !conjuntoA.includes(personaje);
            })
        );

        // Actualizar los nombres de los conjuntos
        if (nombreA) {
            nombreA.textContent = materiaSeleccionadaA;
        }

        if (nombreB) {
            nombreB.textContent = materiaSeleccionadaB;
        }

        // Actualizar el diagrama de Venn
        mostrarPersonajes(soloA, diferenciaA);
        mostrarPersonajes(ambos, interseccion);
        mostrarPersonajes(soloB, diferenciaB);

        // Mostrar los resultados de las operaciones
        mostrarPersonajes(resultadoUnion, union);
        mostrarPersonajes(resultadoInterseccion, interseccion);

        if (resultadoDiferencia) {
            resultadoDiferencia.replaceChildren();

            const tituloA = document.createElement("p");
            tituloA.textContent =
                "A - B (" + materiaSeleccionadaA + "):";

            resultadoDiferencia.appendChild(tituloA);

            const listaA = document.createElement("div");
            mostrarPersonajes(listaA, diferenciaA);
            resultadoDiferencia.appendChild(listaA);

            const tituloB = document.createElement("p");
            tituloB.textContent =
                "B - A (" + materiaSeleccionadaB + "):";

            resultadoDiferencia.appendChild(tituloB);

            const listaB = document.createElement("div");
            mostrarPersonajes(listaB, diferenciaB);
            resultadoDiferencia.appendChild(listaB);
        }

        // Mostrar un mensaje con los resultados
        if (mensaje) {
            mensaje.textContent =
                "¡Conjuntos calculados correctamente! " +
                "A tiene " + conjuntoA.length + " personajes, " +
                "B tiene " + conjuntoB.length + " personajes, " +
                "y " + interseccion.length +
                " pertenecen a ambos conjuntos.";
        }

        // Mostrar una conclusión
        if (conclusion) {
            if (interseccion.length > 0) {
                conclusion.textContent =
                    "Los conjuntos tienen " + interseccion.length +
                    " personaje(s) en común: " +
                    interseccion.join(", ") + ".";
            } else {
                conclusion.textContent =
                    "Los conjuntos no tienen personajes en común. " +
                    "Su intersección es el conjunto vacío.";
            }
        }
    }

    // Preparar la página
    cargarMaterias();
    mostrarUniverso();

    // Ejecutar los cálculos cuando se pulse el botón
    boton.addEventListener("click", calcularConjuntos);

    // Mostrar los resultados iniciales
    calcularConjuntos();

});
