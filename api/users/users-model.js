const db = require('../data/seeds/db-config.js');
const utils = require('../data/seeds/utils');

const findAll = async () => {
    const users = await db('users');
    return users.map( user => utils.userToBody( user ) );
};

const findById = async (users_id) => {
    const user = await db('users').where({ user_id }).first().select('*');
    return utils.userToBody( user );
};

const create = async (user) => {
    console.log(user);
    return db('users')
    .insert(user)
    .then(([user_id]) => findById(user_id));
};

const update = (user_id, changes) => {
    return db('users')
    .where({ user_id })
    .first()
    .update(changes)
    .then(count => (count > 0 ? findById(user_id) : null));
};

const remove = async (user_id) => {
    return await db('users').where({ user_id }).del();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
}