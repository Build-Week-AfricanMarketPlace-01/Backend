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
        .leftJoin('user_items', 'items.item_id', 'user_items.item_id')
        .leftJoin('users', 'user_items.user_id', 'users.user_id')
        .select('items.*', 
        'users.user_id as item_owner_id',
        'users.username as item_owner'
        )
        .where('items.item_id', item_id).first()
}

async function addItem(item, user_id) {
    const [item_id] = await db('items').insert(item, 'item_id')
    console.log(user_id.user_id)
    await db('user_items').insert({ item_id:item_id, user_id:user_id.user_id })
    return db('items').where({item_id}).first()
}

function update(item_id, item) {
    return db('items').where({item_id}).update(item)
}

function remove(item_id) {
    return db('items').where({item_id}).del()
}

module.exports = {
    getAll,
    findBy,
    findById,
    addItem,
    update,
    remove
}