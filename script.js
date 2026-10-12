document.addEventListener("DOMContentLoaded", function () {

    // Personajes y sus características según la narrativa
    const personajes = [
        {
            nombre: "Antonio",
            intereses: [
                "Historia de la Informática",
                "Inteligencia Artificial",
                "Trabajo en Equipo"
            ]
        },
        {
            nombre: "Enrique",
            intereses: [
                "Desarrollo Web",
                "Programación",
                "Creatividad"
            ]
        },
        {
            nombre: "Juan",
            intereses: [
                "Videojuegos",
                "Resolución de Problemas",
                "Matemática Discreta"
            ]
        },
        {
            nombre: "Caspian",
            intereses: [
                "Ciencia de Datos",
                "Matemáticas",
                "Programación",
                "Sistemas Operativos"
            ]
        },
        {
            nombre: "Aylen",
            intereses: [
                "Inteligencia Artificial",
                "Resolución de Problemas",
                "Programación"
            ]
        },
        {
            nombre: "Ángela",
            intereses: [
                "Trabajo en Equipo",
                "Ciencia de Datos",
                "Programación"
            ]
        },
        {
            nombre: "Brenda",
            intereses: [
                "Creatividad",
                "Inteligencia Artificial",
                "Sistemas Operativos"
            ]
        },
        {
            nombre: "Marcelo",
            intereses: [
                "Adaptabilidad",
                "Videojuegos",
                "Historia de la Ingeniería"
            ]
        },
        {
            nombre: "Franco",
            intereses: [
                "Resolución de Problemas",
                "Desarrollo Web",
                "Sistemas Operativos"
            ]
        },
        {
            nombre: "Dylan",
            intereses: [
                "Creatividad",
                "Videojuegos",
                "Matemática Discreta"
            ]
        }
    ];

    // Categorías que se pueden comparar en el juego
    const categorias = [
        "Historia de la Informática",
        "Historia de la Ingeniería",
        "Inteligencia Artificial",
        "Desarrollo Web",
        "Programación",
        "Videojuegos",
        "Matemática Discreta",
        "Matemáticas",
        "Ciencia de Datos",
        "Sistemas Operativos",
        "Resolución de Problemas",
        "Trabajo en Equipo",
        "Creatividad",
        "Adaptabilidad"
    ];

    // Elementos del HTML
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
        console.error(
            "No se encontraron los selectores o el botón de cálculo."
        );
        return;
    }

    // Cargar las categorías en los selectores
    function cargarCategorias() {
        selectorA.replaceChildren();
        selectorB.replaceChildren();

        for (let i = 0; i < categorias.length; i++) {
            const opcionA = document.createElement("option");
            opcionA.value = categorias[i];
            opcionA.textContent = categorias[i];
            selectorA.appendChild(opcionA);

            const opcionB = document.createElement("option");
            opcionB.value = categorias[i];
            opcionB.textContent = categorias[i];
            selectorB.appendChild(opcionB);
        }

        selectorA.value = "Programación";
        selectorB.value = "Inteligencia Artificial";
    }

    // Obtener los personajes que pertenecen a una categoría
    function obtenerConjunto(categoria) {
        const conjunto = [];

        for (let i = 0; i < personajes.length; i++) {
            if (personajes[i].intereses.includes(categoria)) {
                conjunto.push(personajes[i].nombre);
            }
        }

        return conjunto;
    }

    // Mostrar personajes en la página
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

    // Calcular unión, intersección y diferencias
    function calcularConjuntos() {
        const categoriaA = selectorA.value;
        const categoriaB = selectorB.value;

        if (categoriaA === categoriaB) {
            if (mensaje) {
                mensaje.textContent =
                    "Selecciona dos categorías diferentes.";
            }

            return;
        }

        const conjuntoA = obtenerConjunto(categoriaA);
        const conjuntoB = obtenerConjunto(categoriaB);

        // Personajes que pertenecen a ambos conjuntos
        const interseccion = conjuntoA.filter(function (personaje) {
            return conjuntoB.includes(personaje);
        });

        // Personajes que pertenecen solo al conjunto A
        const diferenciaA = conjuntoA.filter(function (personaje) {
            return !conjuntoB.includes(personaje);
        });

        // Personajes que pertenecen solo al conjunto B
        const diferenciaB = conjuntoB.filter(function (personaje) {
            return !conjuntoA.includes(personaje);
        });

        // Personajes que pertenecen a A o a B
        const union = conjuntoA.concat(
            conjuntoB.filter(function (personaje) {
                return !conjuntoA.includes(personaje);
            })
        );

        // Actualizar los nombres de los conjuntos
        if (nombreA) {
            nombreA.textContent = categoriaA;
        }

        if (nombreB) {
            nombreB.textContent = categoriaB;
        }

        // Actualizar el diagrama de Venn
        mostrarPersonajes(soloA, diferenciaA);
        mostrarPersonajes(ambos, interseccion);
        mostrarPersonajes(soloB, diferenciaB);

        // Mostrar la unión y la intersección
        mostrarPersonajes(resultadoUnion, union);
        mostrarPersonajes(resultadoInterseccion, interseccion);

        // Mostrar las dos diferencias
        if (resultadoDiferencia) {
            resultadoDiferencia.replaceChildren();

            const tituloA = document.createElement("p");
            tituloA.textContent = "A - B (" + categoriaA + "):";
            resultadoDiferencia.appendChild(tituloA);

            const listaA = document.createElement("div");
            mostrarPersonajes(listaA, diferenciaA);
            resultadoDiferencia.appendChild(listaA);

            const tituloB = document.createElement("p");
            tituloB.textContent = "B - A (" + categoriaB + "):";
            resultadoDiferencia.appendChild(tituloB);

            const listaB = document.createElement("div");
            mostrarPersonajes(listaB, diferenciaB);
            resultadoDiferencia.appendChild(listaB);
        }

        // Mostrar un mensaje con los resultados
        if (mensaje) {
            mensaje.textContent =
                "¡Conjuntos calculados! El conjunto A tiene " +
                conjuntoA.length +
                " personajes y el conjunto B tiene " +
                conjuntoB.length +
                ". Hay " +
                interseccion.length +
                " personaje(s) en común.";
        }

        // Explicar el resultado de la intersección
        if (conclusion) {
            if (interseccion.length > 0) {
                conclusion.textContent =
                    "Los personajes que comparten ambas categorías son: " +
                    interseccion.join(", ") + ".";
            } else {
                conclusion.textContent =
                    "Ningún personaje pertenece a ambas categorías. " +
                    "La intersección es el conjunto vacío.";
            }
        }
    }

    // Preparar el juego
    cargarCategorias();
    mostrarUniverso();

    // Calcular cuando se pulse el botón
    boton.addEventListener("click", calcularConjuntos);

    // Mostrar un resultado inicial
    calcularConjuntos();

});
