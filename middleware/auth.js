const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../secrets/index')

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return next({
            status: 401,
            message: 'token required'
        })
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            next({
                status: 401,
                message: 'Token invalid'
            })
        } else {
            req.decodedToken = decodedToken
            next()
        }
    })
}

function tokenBuilder(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        options
    )
    return token
}

module.exports = {
    restricted,
    tokenBuilder
}