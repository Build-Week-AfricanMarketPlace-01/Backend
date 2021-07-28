const db = require('../data/db-config')

function findAll() {
    return db('users').select('user_id', 'username')
}

function findUsers(user_id) {
    return db('users')
        .select("user_id", "username",)
        .where({ user_id })
        .first()
}

function findUsersBy(filter) {
    return db('users')
        .where(filter)
        .orderBy('user_id')
}

// function findUsersById(item_id) { //fix
//     return db('users')
//         .leftJoin('user_items', 'items.item_id', 'userItems.item_id')
//         .leftJoin('users', 'user_items', 'users.user_id')
//         .select(
//             'items.*',
//             'users.user_id as item_owner_id',
//             'user.username as item_owner'
//         )
//         .where('items.item_id', item_id).first()
// }

async function addUser(user) { //fix
    const [user_id] = await db('users').insert(user, 'user_id')
    return db('users').where({user_id}).first()
}



// function getAccountItems(user_id) { 
//     return db("items as i")
//         .select("i.item_id", "i.item_name", "i.category", "i.item_description", "i.price", "u.username as renter")
//         .leftJoin("requests as r", "r.item_id", "i.item_id")
//         .leftJoin("users as u", "r.renter_id", "u.user_id")
//         .distinctOn("i.item_id")
//         .where("i.owner_id", user_id)
// }

// function getAccountRequests(user_id) {
//     return db("requests as r")
//         .select("r.request_id", "i.item_name", "u.username as owner", "r.status")
//         .leftJoin("items as i", "r.item_id", "i.item_id")
//         .leftJoin("users as u", "i.owner_id", "u.user_id")
//         .where("r.renter_id", user_id)
// }

// function getMyAccountRequests(user_id) { 
//     return db("requests as r")
//         .select("r.request_id", "i.item_name", "u.username as requester", "r.status")
//         .leftJoin("items as i", "r.item_id", "i.item_id")
//         .leftJoin("users as u", "r.renter_id", "u.user_id")
//         .where("i.owner_id", user_id)
// }

function update(user_id, user) { 
    return db("users")
        .update(user)
        .where({user_id})
}

function remove(user_id) {
    return db("users")
        .where({user_id})
        .del()
}

module.exports = {
    findAll,
    findUsers,
    findUsersBy,
    // findUsersById,
    addUser,
    update,
    remove
}

//git test