const db = require('../data/db-config')

function getAll() {
    return db('items')
        .leftJoin('user_items', 'items.item_id', 'user_items.item_id')
        .leftJoin('users', 'user_items.user_id', 'users.user_id')
        .select('items.*', 
        'users.user_id as item_owner_id',
        'users.username as item_owner'
    )
}

module.exports = {
    getAll
}