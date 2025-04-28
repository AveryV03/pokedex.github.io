
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered!', reg))
            .catch(err => console.log('Service Worker registration faild:', err));
    });
}

var inputText = document.getElementById("searchText");
var inputButt = document.getElementById("searchButt");
var sprite = document.getElementById("pokeImage");
var strName = document.getElementById("name");
var strID = document.getElementById("ID");
var strType0 = document.getElementById("type0");
var strType1 = document.getElementById("type1");
var hp = document.getElementById("stat0");
var attack = document.getElementById("stat1");
var defense = document.getElementById("stat2");
var special_attack = document.getElementById("stat3");
var special_defense = document.getElementById("stat4");
var speed = document.getElementById("stat5");
var strNext = document.getElementById('next');
var strBack = document.getElementById('back');
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
inputButt.addEventListener('click', function () {
    var inputValue = inputText.value;
    if (inputValue) {

        nextValue = inputValue;
        getPokemon(nextValue);
        inputText.value = ""
    }
})

var nextValue = 1;
var backValue = 0;

strNext.addEventListener('click', function () {
    nextValue = Number(nextValue) + 1;
    console.log(nextValue);
    getPokemon(nextValue);
});

strBack.addEventListener('click', function () {
    nextValue = Number(nextValue) - 1;
    console.log(nextValue);
    getPokemon(nextValue);
});

function getPokemon(value) {
    var request = new XMLHttpRequest();
    request.open('GET', `https://pokeapi.co/api/v2/pokemon/${value}`);

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            try {
                var response = JSON.parse(request.responseText);
                showPokemon(response);
            } catch (err) {
                showError("Oops! Couldn't parse Pokémon data.");
                console.error("Parsing error:", err);
            }
        } else {
            showError(`Pokémon not found! Try again.`);
            console.warn("API error:", request.statusText);
        }
    };

    request.send();
}

function showPokemon(response) {
    var pokemon = response;
    strName.innerHTML = capitalize(pokemon.name);
    strID.innerHTML = pokemon.id;
    sprite.src = pokemon.sprites.front_default;

    nextValue = pokemon.id; // 👈 store correct ID

    if (pokemon.types.length === 1) {
        strType0.innerHTML = capitalize(pokemon.types[0].type.name);
        strType1.innerHTML = "";
    } else {
        strType0.innerHTML = capitalize(pokemon.types[0].type.name);
        strType1.innerHTML = capitalize(pokemon.types[1].type.name);
    }
    
    hp.innerHTML = pokemon.stats[0].base_stat;
    attack.innerHTML = pokemon.stats[1].base_stat;
    defense.innerHTML = pokemon.stats[2].base_stat;
    special_attack.innerHTML = pokemon.stats[3].base_stat;
    special_defense.innerHTML = pokemon.stats[4].base_stat;
    speed.innerHTML = pokemon.stats[5].base_stat;
}

function showError(message) {
        strName.innerHTML = message;
    }


getPokemon(nextValue);
