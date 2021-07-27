const router = require('express').Router()
const Item = require('./items-model')
const { checkId, confirmItem } = require('./items-middleware')

// [GET] all items
router.get('/', (req, res, next) => {
    Item.getAll()
    .then(items => {
        res.json(items)
    })
    .catch(next)
})

// [GET] a certain item
router.get('/:item_id', checkId, (req, res, next) => {
    const {item_id} = req.params
    Item.findById(item_id)
    .then(item => {
        res.json(item)
    })
    .catch(next)
})

// [POST] add a new item
router.post('/user/:user_id', confirmItem, (req, res, next) => {
    Item.addItem(req.body, req.params)
    .then(item => {
        res.status(201).json(item)
    })
    .catch(next)
})

// [PUT] edit a certain item info
router.put('/:item_id', checkId, confirmItem, (req, res, next) => {
    const {name, location, price, description} = req.body

    Item.update(req.params.item_id, {name, location, price, description})
    .then(() => {
        res.status(200).json(req.body)
    })
    .catch(next)
})

// [DELETE] a users item
router.delete('/:user_id/:item_id', checkId, (req, res, next) => {
    Item.remove(req.params.item_id)
    .then(() => {
        res.status(200).json({
            message: 'Not a hot seller or sold?'
        })
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
