let pokemonList = [];
pokemonList[0] = {
    name: "Bulbasaur",
    height: 0.7,
    types: ["Grass","Poison"]
};
pokemonList[1] = {
    name: "Ivysaur",
    height: 1,
    types: ["Grass","Poison"]
};
pokemonList[2] = {
    name: "Venusaur",
    height: 2,
    types: ["Grass","Poison"]
};


// Loop through pokemonList to add the Pokemon's name and height to index.html
for (let i = 0; i < pokemonList.length; i++) {
    // Loop through pokemonList to add the Pokemon's name and height to index.html
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    

    // Check if the Pokemon's height is above 1.5 meters. If true, indicate that it's a larger Pokemon
    if (pokemonList[i].height >= 1.5) {
        document.write(" - Wow, that's big!")
    }

    document.write("<br/>");
}