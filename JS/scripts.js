let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon 
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
      return pokemonList;
    }
    
    function buttonListener (button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.classList.add("button-class");
      button.innerText = pokemon.name;
      pokemonList.appendChild(listpokemon);
      listpokemon.appendChild(button);
      buttonListener(button, pokemon);
    }
    
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    function showModal(pokemon) {
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
  
      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height;
  
      let container = document.querySelector('#image-container');
      let myImage = document.createElement('img');
      myImage.src = pokemon.imageUrl;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(myImage);
      modalContainer.appendChild(modal);
      
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal Title', 'this is modal content');
    });
  
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains ('is-visible')) {
        hideModal();
      }
    });
  
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal
    }
  })();

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  