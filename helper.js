exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (pokemons) => {

    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b))
    const uniqueIds = maxId + 1

    let uniqueId;
    return uniqueId
}