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

function findBy(filter) {
    return db('items')
        .where(filter)
        .orderBy('item_id')
}

function findById(item_id) {
    return db('items')
        .leftJoin('user_items', 'items.item_id', 'userItems.item_id')
        .leftJoin('users', 'user_items', 'users.user_id')
        .select(
            'item.*',
            'users.user_id as item_owner_id',
            'user.username as item_owner'
        )
        .where('item.item_id', item_id).first()
}

module.exports = {
    getAll,
    findBy,
}