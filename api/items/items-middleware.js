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

module.exports = {
    checkId
}