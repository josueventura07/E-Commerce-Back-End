const router = require('express').Router()

const productsServices = require('./products.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
    .get(productsServices.getAllProducts)
    .post(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, productsServices.postProduct)

router.route('/stock')
    .get(productsServices.getAllStocks)


router.route('/:id')
    .get(productsServices.getProductById)
    .patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, productsServices.patchProduct)
    .delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, productsServices.deleteProduct)

module.exports = router