let pokemonRepository=function(){let e=[];function t(t){e.push(t),console.log("Pokemon added successfully")}function n(){return e}function i(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=[],t.types.forEach(function(t){e.types.push(t.type.name)})}).catch(function(e){console.error(e)})}return{getAll:n,add:t,loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:i,addListItem:function e(t){let n=document.querySelector(".pokemon-list"),o=document.createElement("li"),a=document.createElement("button");a.innerText=t.name,o.classList.add("list-group-item"),a.setAttribute("type","button"),a.classList.add("btn","btn-primary","pokemon"),a.setAttribute("data-bs-toggle","modal"),a.setAttribute("data-bs-target","#pokedex"),o.appendChild(a),n.appendChild(o),function e(t,n){t.addEventListener("click",()=>{!function e(t){i(t).then(function(){let e=document.querySelector(".modal-dialog");e.innerHTML="";let n=document.createElement("div");n.classList.add("modal-content");let i=document.createElement("div");i.classList.add("modal-header");let o=document.createElement("div");o.classList.add("modal-body");let a=document.createElement("h1");a.classList.add("modal-title","fs-1"),a.setAttribute("id","pokemonName"),a.innerText=t.name;let l=document.createElement("button");l.setAttribute("type","button"),l.classList.add("btn-close"),l.setAttribute("data-bs-dismiss","modal"),l.setAttribute("aria-label","Close");let s=document.createElement("p");s.innerText="Height: "+t.height,document.createElement("p"),s.innerText="Type: "+t.types;let r=document.createElement("img");r.setAttribute("src",t.imageUrl),r.setAttribute("alt",`image of ${t.name}`),i.appendChild(a),i.appendChild(l),o.appendChild(r),o.appendChild(s),n.appendChild(i),n.appendChild(o),e.appendChild(n)})}(n)})}(a,t)}}}();function findPokemon(e,t){let n=[];return e.forEach(function(e){n.push(e.name)}),0===n.filter(e=>e===t).length?`${t} does not exist in Pokedex`:`${t} is in the Pokedex`}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});