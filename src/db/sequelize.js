    const { Sequelize, DataTypes } = require('sequelize')
    const PokemonModel = require('../model/pokemon')
    const UserModel = require('../model/user')
    const pokemons = require('./mock-pokemon')
    const bcrypt = require('bcrypt')
    const {hash} = require("bcrypt");
    // Gestion de mise à jour CRUD

    const sequelize = new Sequelize('pokedex', 'root', 'root', {
        host: 'localhost',
        port: 8889,
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: false
    })

    const Pokemon = PokemonModel(sequelize, DataTypes)
    const User = UserModel(sequelize, DataTypes)

    const initDb = () => {
        return sequelize.sync({force: true}).then(_ => {
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                }).then(pokemon => console.log(pokemon.toJSON()))
            })

            bcrypt.hash('pikachu', 10)
                .then(hash => User.create({ username: 'pikachu', password: hash,}))
                .then(user => console.log(user.toJSON()))

            console.log('La base de donnée a bien été initialisée !')
        })
    }

    module.exports = {
        initDb, Pokemon, User
    }