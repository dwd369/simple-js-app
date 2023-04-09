let pokemonRepository = (function () {

    // declare pokemonList array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let single = 'single';

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

        // setup list item
        listItem.classList.add("list-group-item");

        // button.classList.add("pokemon");
        button.setAttribute("type", "button");
        button.classList.add("btn", "btn-primary", "pokemon");
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#pokedex");
        
    
        // add button to li and then ul
        listItem.appendChild(button);
        element.appendChild(listItem);

        clickToShowDetails(button, pokemon);
    }

    // function to log pokemon details
    function showDetails(pokemon) {

        // promise to check if loading pokemon were loaded successfully
        loadDetails(pokemon).then(function () {

            let modalDialog = document.querySelector(".modal-dialog");

            // clear modal-container
            modalDialog.innerHTML = "";
            
            // create modal-content under modal-dialog
            let modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            // create modal-header
            let modalHeader = document.createElement("div");
            modalHeader.classList.add("modal-header");

            // create modal-body
            let modalBody = document.createElement("div");
            modalBody.classList.add("modal-body");

            // title to show pokemon name
            let title = document.createElement("h1");
            title.classList.add("modal-title", "fs-1");
            title.setAttribute("id", "pokemonName");
            title.innerText = pokemon.name;
            
            // close button for modal
            let closeButton = document.createElement("button");
            closeButton.setAttribute("type", "button");
            closeButton.classList.add("btn-close");
            closeButton.setAttribute("data-bs-dismiss", "modal");
            closeButton.setAttribute("aria-label", "Close");

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

            // append close button and title to modal-header
            modalHeader.appendChild(title);
            modalHeader.appendChild(closeButton);

            // append image and height to modal-body
            modalBody.appendChild(image);
            modalBody.appendChild(height);

            // append modal-header and modal-body to modal-content
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);

            // append modal-content to modal-dialog
            modalDialog.appendChild(modalContent);

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
                item.types.push(type.type.name);
            });

        }).catch(function (e) {
            console.error(e);
        });
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


