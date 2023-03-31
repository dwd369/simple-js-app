let pokemonRepository = (function () {

    // declare pokemonList array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // function to add a Pokemon to the pokemonList
    function add(pokemon) {

        pokemonList.push(pokemon);
        console.log("Pokemon added successfully")
    }

    // function to return the list of pokemonList
    function getAll() {
        return pokemonList;
    }

    // function to write the pokemons in the pokemonlist to the DOM as a button
    function addListItem(pokemon) {
        
        // declare elements to add
        let element = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        
        // setup button
        button.innerText = pokemon.name;
        button.classList.add("pokemon");
        
    
        // add button to li and then ul
        listItem.appendChild(button);
        element.appendChild(listItem);

        clickToShowDetails(button, pokemon);
    }

    // function to log pokemon details
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        })
    }

    // function to show details when user clicks
    function clickToShowDetails(forButton, pokemon) {
        forButton.addEventListener("click", () => {showDetails(pokemon) });
    }

    // function 
    function loadList() {

        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {

        let url = item.detailsUrl;


        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
      }

    //   function showLoadingMessage() {
    //     let body = document.querySelector("body");
    //     let message = document.createElement("p")
    //     message.innerHTML = "The Pokedex is loading"
    //     body.appendChild(message);
    //   }

    //   function hideLoadingMessage() {
    //     let body = document.querySelector("body");
    //     let message = body.lastElementChild;
    //     console.log(message);
    //     console.log(message.parentElement);
    //   }

    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem
    };

})();

// function to find a Pokemon within the Pokedex
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

pokemonRepository.loadList().then(function() {
    // now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    })
})
