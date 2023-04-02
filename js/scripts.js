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

        // promise to check if loading pokemon were loaded successfully
        loadDetails(pokemon).then(function () {

            // clear modal-container
            let modalContainer = document.querySelector("#modal-container");
            modalContainer.innerHTML = "";
            
            // create modal under modal-container
            let modal = document.createElement("div");
            modal.classList.add("modal");

            // close button for modal
            let closeButton = document.createElement("button");
            closeButton.classList.add("modal-close");
            closeButton.innerText = "x";
            closeButton.addEventListener('click', hideModal);

            // title to show pokemon name
            let title = document.createElement("h1");
            title.innerText = pokemon.name;

            // label to show pokemon height
            let height = document.createElement("p");
            height.innerText = "Height: " + pokemon.height;

            // label to show pokemon type
            let types = document.createElement("p");
            height.innerText = "Type: " + pokemon.types;

            // image to show pokemon image
            let image = document.createElement("img");
            image.setAttribute("src", pokemon.imageUrl);
            image.setAttribute("alt", `image of ${pokemon.name}`);

            // append close button, title, and text to modal
            modal.appendChild(closeButton);
            modal.appendChild(title);
            modal.appendChild(image);
            modal.appendChild(height);
            modalContainer.appendChild(modal);

            // make modalContainer visible
            modalContainer.classList.add("is-visible");
            modalContainer.addEventListener("click", hideModal);
            
            // add eventlistener to DOM to see if Escape key is pressed
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                    hideModal();
                }
            });
        });
    }

    // function to show details when user clicks
    function clickToShowDetails(forButton, pokemon) {
        forButton.addEventListener("click", () => {showDetails(pokemon) });
    }

    // function for loading pokeon including names and the details URL
    function loadList() {

        // promise to check if fetching pokemon via apiURL is successful
        // load pokemon if successful, catch error if failed
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

    // function to load the details for the pokemon
    function loadDetails(item) {

        let url = item.detailsUrl;

        // return promise to fetch details JSON from item.detailsUrl
        // return json file if successful, and then load the details into pokemon array
        // catch error if failed
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {

            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = [];

            // load pokemon type as an array to pokemon types
            details.types.forEach(function (type) {
                console.log(type.type.name);
                item.types.push(type.type.name);
            });

        }).catch(function (e) {
            console.error(e);
        });
      }

    // function to hide modal-container
    function hideModal() {
        modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove("is-visible");
    }

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
});


