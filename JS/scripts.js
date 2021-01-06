let pokemonRepository = (function () {
let pokemonList = [{
        name: 'Bulbasaur',
        height: 0.7,
        type: ["grass"],
    },
    {
        name: 'Charmander',
        height: 0.6,
        type: ["fire"],

    },
    {
        name: 'Squirtle',
        height: 0.5,
        type: ["water"],
    }
];
return {
    add:function(pokemon) {
        pokemonList.push(pokemon);
    },
    getAll: function() {
        return pokemonList;
    }
};
})();
console.log(pokemonRepository.getAll()); //
[]
pokemonRepository.add({ name: 'Pikachu', height: 0.5, type: ["electric"]  });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]
