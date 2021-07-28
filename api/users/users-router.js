const router = require('express').Router()
const Users = require('../users/users-model');
const {checkParamsExist} = require("../users/users-middleware")

const bcrypt = require("bcryptjs");
const { tokenBuilder, restricted } = require('../../middleware/auth');

// [GET] all users
router.get('/', restricted,(req, res, next) => {
    Users.findAll()
    .then(users => {
        res.json(users)
    })
    .catch(next)
})

// [GET] a certain user
router.get('/:user_id', restricted, (req, res, next) => {
    res.json({message: 'get by id'})
})

// [POST] registers a new user
router.post('/register', (req, res, next) => {
    const {username, password,} = req.body
    const trimUser = username.trim()
    const hash = bcrypt.hashSync(password, 8)

    Users.addUser({username: trimUser, password: hash,})
    .then(user => {
        res.status(201).json(user)
    })
    .catch(next)
})

// [POST] log in that user
router.post('/login', (req, res, next) => {
    const {username} = req.body
    Users.findUsersBy({username})
    .then(([user]) => {
        const token = tokenBuilder(user)
        const user_id = user.user_id
        res.json({
            message: 'Login working',
            user_id,
            token
        })
    })
    .catch(next)
})

// [PUT] edit a user
router.put('/:user_id', restricted, (req, res, next) => {
    // res.json({message: 'edit a user'})
    const id = req.decodedToken.subject;
    const user = { username:req.body.username, password:bcrypt.hashSync(req.body.password, 8) }
    req.body.email ? user.email = req.body.email : {}
    Accounts.update(id, user)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(next)

})

// [DELETE] a user
router.delete('/:user_id', restricted, (req, res, next) => {
    res.json({message: 'remove a user'})
})

// ERROR HANDLING 
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router