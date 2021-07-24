const router = require('express').Router()

// [GET] all users
router.get('/', (req, res, next) => {
    res.json({message: 'get all'})
})

// [GET] a certain user
router.get('/:user_id', (req, res, next) => {
    res.json({message: 'get by id'})
})

// [POST] registers a new user
router.post('/register', (req, res, next) => {
    res.json({message: 'register a new user'})
})

// [POST] log in that user
router.post('/login', (req, res, next) => {
    res.json({message: 'log in user'})
})

// [PUT] edit a user
router.put('/:user_id', (req, res, next) => {
    res.json({message: 'edit a user'})
})

// [DELETE] a user
router.delete('/:user_id', (req, res, next) => {
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