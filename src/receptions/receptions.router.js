const router = require('express').Router()

const receptionsServices = require('../receptions/receptions.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

//? Estas son las rutas para ver y crear recibos en negocio especifico solo admin o employees
router.route('/')
.get(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receptionsServices.getAllReceptions)
.post(passportJWT.authenticate('jwt', {session: false}), receptionsServices.postReception)

router.route('/me')
.get(passportJWT.authenticate('jwt', {session: false}), receptionsServices.getAllMyReceptions)

module.exports = router
