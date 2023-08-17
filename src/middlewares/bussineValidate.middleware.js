const bussineControllers = require('../bussines/bussines.controllers')

const bussineValidateMiddleware = async (req, res, next) => {
    const data = await bussineControllers.validateOneBussineExist() 
    if(data === 0){
        next()
    } else {
        res.status(401).json({message: 'A bussine already exist'})
    }
}


module.exports = bussineValidateMiddleware