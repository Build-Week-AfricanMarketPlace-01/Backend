const Item = require('./items-model')

const checkId = (req, res, next) => {
    const id = req.params.item_id
    Item.findBy(id)
    .then(item => {
        if(!item) {
            res.status(404).json({
                message: 'item does not exist'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const confirmItem = (req, res, next) => {
    const {name, location, price, description} = req.body
    if(
        !name || name.trim() === null
        || !location || location.trim() === null
        || !price || !description || description.trim() === null
    ) {
        res.status(400).json({
            message: "All items must have name, location, price, and description"
        })
    } else {
        next()
    }
}

module.exports = {
    checkId,
    confirmItem
}