const router = require('express').Router()

const ordersServices = require('../orders/orders.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

//? Estas son las rutas para ver y crear recibos en negocio especifico solo admin o employees
router.route('/')
.get(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, ordersServices.getAllOrders)
.post(passportJWT.authenticate('jwt', {session: false}), ordersServices.postOrder)

router.route('/me')
.get(passportJWT.authenticate('jwt', {session: false}), ordersServices.getAllMyOrders)

module.exports = router