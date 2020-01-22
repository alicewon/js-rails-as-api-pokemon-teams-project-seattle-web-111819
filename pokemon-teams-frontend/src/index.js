const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let currentPokemonDiv = null

document.addEventListener("DOMContentLoaded", () => {
    getAllTrainers()
})

const getAllTrainers = () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => displayAllTrainers(json))
}

const displayAllTrainers = json => {
  json.forEach(trainer => displayTrainer(trainer))
}

const displayTrainer = trainer => {
  document.querySelector('main').appendChild(makeTrainerCard(trainer))
}

const makeTrainerCard = trainer => {
  let div = document.createElement('div')
  div.className = "card"
  let p = document.createElement('p')
  p.innerText = trainer.name
  let addButton = document.createElement('button')
  addButton.innerText = "Add Pokemon"
  addButton.onclick = e => {
    currentPokemonDiv = div
    addPokemon(e, trainer)}
  let ul = document.createElement('ul')
  trainer.pokemons.forEach(pokemon => {
      let li = document.createElement('li')
      li.innerText = `${pokemon.nickname} (${pokemon.species})`
      let releaseButton = document.createElement('button')
      releaseButton.innerText = "Release"
      releaseButton.className = "release"
      releaseButton.onclick = pokemon => doSomething(pokemon)
      li.appendChild(releaseButton)
      ul.appendChild(li)
  })
  div.appendChild(p)
  div.appendChild(addButton)
  div.appendChild(ul)
  return div
}

const addPokemon = (e, trainer) => {
  // fetch to POST to pokemon#create
  // wait for response, then render (replace)
  // send this fetch to the route that our backend knows the controller pokemon create method
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
    })
  })
  .then(resp => resp.json())
  .then(json => addPokemonToTrainer(json, trainer))
}

const addPokemonToTrainer = (json, trainer) => {
  fetch(`${TRAINERS_URL}/${trainer.id}`)
  .then(resp => resp.json())
  .then(json => currentPokemonDiv.replaceWith(makeTrainerCard(json)))
}

const deletePokemon = (e, trainer) => {
  //.remove()
}