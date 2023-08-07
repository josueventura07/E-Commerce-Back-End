const router = require('express').Router()

const cartsServices = require('./carts.services')
const cartMiddleware = require('../middlewares/cart.middleware')
const passportJWT = require('../middlewares/auth.middleware')

router.route('/')
.get(passportJWT.authenticate('jwt', {session: false}), cartsServices.getMyItemsCart)
.post(passportJWT.authenticate('jwt', {session: false}), cartMiddleware, cartsServices.postNewItemInCart)

router.route('/:id')
.delete(passportJWT.authenticate('jwt', {session: false}), cartsServices.deleteProductInCart)


module.exports = router