const router = require('express').Router()

const cartsServices = require('./carts.services')
const passportJWT = require('../middlewares/auth.middleware')
const cartMiddleware = require('../middlewares/cart.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
.get(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, cartsServices.getAllCarts)
.post(passportJWT.authenticate('jwt', {session: false}), cartMiddleware, cartsServices.postNewItemInCart)

router.route('/myCart')
.get(passportJWT.authenticate('jwt', {session: false}), cartsServices.getAllProductsInMyCart)

router.route('/:id')
.patch(passportJWT.authenticate('jwt', {session: false}), cartsServices.patchProductInCart)
.delete(passportJWT.authenticate('jwt', {session: false}), cartsServices.deleteProductInCart)


module.exports = router