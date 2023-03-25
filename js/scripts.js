let pokemonRepository = (function () {

    // declare pokemonList array
    let pokemonList = [
        {
            name: "Bulbasaur",
            height: 0.7,
            types: ["Grass"," Poison"]
        },
        {
            name: "Ivysaur",
            height: 1,
            types: ["Grass"," Poison"]
        },
        {
            name: "Venusaur",
            height: 2,
            types: ["Grass"," Poison"]
        }
    ];

    function add(pokemon) {

        // Validation of Pokemon entered by users. 
        //Validation criteria includes if it is an object, if the keys matched, if name is string, if height is number, and if type is array
        if (typeof(pokemon) !== "object") {
            console.log("This is not a valid Pokemon, please try again.");
        } else if (!(Object.keys(pokemonList[0]).every(key => key in pokemon))) {
            console.log("Please provide the right keys and values for adding a new pokemon.")
        } else if (typeof(pokemon.name) !== "string") {
            console.log("The name for the Pokemon is not a string, please try again.");
        } else if (typeof(pokemon.height) !== "number") {
            console.log("The height you entered for the Pokemon is not a number, please try again.");
        } else if (!(Array.isArray(pokemon.types))) {
            console.log("The type(s) you entered for the Pokemon is not an array, please try again.");
        } else {
            pokemonList.push(pokemon);
            console.log("Pokemon added successfully");
        } 
    }

    function getAll() {
        return pokemonList;
    }

    return {
        getAll: getAll,
        add: add
    };

})();

function findPokemon(inPokedex, pokemonName) {
    let pokemons = [];
    inPokedex.forEach(function(pokemon) {
        pokemons.push(pokemon.name);
    });

    let result = pokemons.filter(pokemon => pokemon === pokemonName);

    if (result.length === 0) {
        return `${pokemonName} does not exist in Pokedex`
    } else {
        return `${pokemonName} is in the Pokedex`
    }
}


// Retrieve pokemonList from pokemonRepository
let pokedex = pokemonRepository.getAll();


// Write Pokedex to DOM body
pokedex.forEach(function(pokemon) {
    
    // Loop through pokemonList to add the Pokemon's name and height to index.html
    document.write(`${pokemon.name} (height: ${pokemon.height}, type: ${pokemon.types})`);

    // Check if the Pokemon's height is above 1.5 meters. If true, indicate that it's a larger Pokemon
    if (pokemon.height >= 1.5) {
        document.write(" - Wow, that's big!");
    }
    
    // Add line break in between
    document.write("<br/>");
});


let abc = findPokemon(pokedex,"Bulbasaur");
document.write(abc);