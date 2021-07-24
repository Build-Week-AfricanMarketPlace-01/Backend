const router = require('express').Router()

// [GET] all items
router.get('/', (req, res, next) => {
    res.json({message: 'all items please'})
})

// [GET] a certain item
router.get('/:item_id', (req, res, next) => [
    res.json({message: 'get a certain item'})
])

// [POST] add a new item
router.post('/user/:item_id', (req, res, next) => {
    res.json({message: 'add an item'})
})

// [PUT] edit a certain item info
router.put('/:item_id', (req, res, next) => {
    res.json({message: 'edit a item details'})
})

// [DELETE] a users item
router.delete('/:user_id/:item_id', (req, res, next) => {
    res.json({message: 'delete that item'})
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
