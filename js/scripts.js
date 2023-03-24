let pokemonRepository = (function () {

    // declare pokemonList array
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ["Grass","Poison"]
        },
        {
            name: "Ivysaur",
            height: 1,
            types: ["Grass","Poison"]
        },
        {
            name: "Venusaur",
            height: 2,
            types: ["Grass","Poison"]
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
        console.log("Pokemon added successfully");
    }

    function getAll() {
        let text = "";
        pokemonList.forEach(function(pokemon) {
            
            // Loop through pokemonList to add the Pokemon's name and height to index.html
            text += (`${pokemon.name} (height: ${pokemon.height})`);

            // Check if the Pokemon's height is above 1.5 meters. If true, indicate that it's a larger Pokemon
            if (pokemon.height >= 1.5) {
                text += (" - Wow, that's big!")
            }
            
            // Add line break in between
            text += "<br/>";
        })

        return text;
    }

    return {
        getAll: getAll,
        add: add
    };

})();

document.write(pokemonRepository.getAll());