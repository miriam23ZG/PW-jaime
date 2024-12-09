const formulario = document.getElementById("formulario-busqueda");
const nombrePokemon = document.getElementById("nombre-pokemon");
const listaTipos = document.getElementById("tipos-pokemon");
const imagen = document.getElementById("imagen-pokemon");
const alturaPokemon = document.getElementById("altura-pokemon");
const pesoPokemon = document.getElementById("peso-pokemon");
const listaHabilidades = document.getElementById("habilidades-pokemon");
const listaEstadisticas = document.getElementById("estadisticas-pokemon");
const sonido = document.getElementById("sonido-pokemon");
const idPokemon = document.getElementById("id-pokemon");
const mensajeError = document.getElementById("mensaje-error");

function limpiarResultados() {
    nombrePokemon.innerText = "";
    idPokemon.innerText = "";
    listaTipos.innerHTML = "";
    imagen.setAttribute("src", "");
    alturaPokemon.innerText = "-";
    pesoPokemon.innerText = "-";
    listaHabilidades.innerHTML = "";
    listaEstadisticas.innerHTML = "";
    sonido.style.display = "none";
    sonido.classList.remove("activo");
    sonido.setAttribute("src", "");
}

function mostrarError(mensaje) {
    limpiarResultados();
    mensajeError.innerText = mensaje;
    mensajeError.style.display = "block";
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.getElementById("input-nombre-pokemon").value.toLowerCase();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then((respuesta) => {
            if (!respuesta.ok) throw new Error(`Pokémon ${nombre} no encontrado`);
            return respuesta.json();
        })
        .then((pokemon) => {
            limpiarResultados();
            mensajeError.style.display = "none";

            nombrePokemon.innerText = pokemon.name;
            idPokemon.innerText = `${pokemon.id}`;

            const ulTipos = document.createElement("ul");
            pokemon.types.forEach((tipo) => {
                const item = document.createElement("li");
                item.innerText = tipo.type.name;
                item.classList.add(`tipo-${tipo.type.name}`);
                ulTipos.appendChild(item);
            });
            listaTipos.appendChild(ulTipos);

            imagen.setAttribute("src", pokemon.sprites.front_shiny);
            imagen.style.width = "300px";
            imagen.style.height = "300px";

            alturaPokemon.innerText = `${pokemon.height / 10} m`;
            pesoPokemon.innerText = `${pokemon.weight / 10} kg`;

            const ulHabilidades = document.createElement("ul");
            pokemon.abilities.forEach((habilidad) => {
                const item = document.createElement("li");
                item.innerText = habilidad.ability.name;
                ulHabilidades.appendChild(item);
            });
            listaHabilidades.appendChild(ulHabilidades);

            const ulEstadisticas = document.createElement("ul");
            pokemon.stats.forEach((estadistica) => {
                const item = document.createElement("li");
                item.innerText = `${estadistica.stat.name}: ${estadistica.base_stat}`;
                ulEstadisticas.appendChild(item);
            });
            listaEstadisticas.appendChild(ulEstadisticas);

            const urlSonido = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`;

            fetch(urlSonido)
                .then((respuesta) => {
                    if (respuesta.ok) {
                        console.log("Audio encontrado para Pokémon:", pokemon.name);
                        sonido.setAttribute("src", urlSonido);
                        sonido.classList.add("activo");
                        sonido.style.display = "block";
                        sonido.controls = true;
                    } else {
                        throw new Error("Sonido no encontrado para este Pokémon");
                    }
                })
                .catch((error) => {
                    console.warn(error.message);
                    sonido.style.display = "none";
                });
        })
        .catch((error) => {
            mostrarError(error.message);
            console.error(error);
        });
});