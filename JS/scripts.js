let pokemonList = [
    {
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
]
var i;
//Used a ternary operator here to find and label the biggest pokemon and the smallest
for (i = 0; i < pokemonList.length; i++) {
    let specialText = pokemonList[i].height > 0.6 ? "This is the biggest!" : "This is smaller..."; 
    document.write(pokemonList[i].name + " " + "(Height:" + pokemonList[i].height + ")" + specialText + "<br>");
}