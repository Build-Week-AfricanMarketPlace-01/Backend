const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const knex = require('knex')
const db = require('./data/db-config')

const UsersRouter = require('./users/users-router')
const ItemsRouter =require('./items/items-router')

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', UsersRouter)
server.use('/api/items', ItemsRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

module.exports = server
