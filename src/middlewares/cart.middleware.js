const usersControllers = require('../users/users.controllers')

const cartMiddleware = async (req, res, next) => {
    const user = await usersControllers.findUserById(req.user.id)
    if(user.bussineId !== null){
        next()
    } else {
        res.status(401).json({message: 'There is no bussine associated to this user'})
    }
}


module.exports = cartMiddleware