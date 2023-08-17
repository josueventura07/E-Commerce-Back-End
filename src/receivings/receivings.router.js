const router = require('express').Router()

const receivingsServices = require('./receivings.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

//? Estas son las rutas para ver y crear recibos en negocio especifico solo admin o employees
router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receivingsServices.getAllReceivings)


router.route('/me')
    .get(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receivingsServices.getAllMyReceivings)
    .post(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receivingsServices.postNewItemInReceivings)

router.route('/:id')
    .patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receivingsServices.pathItemInReceivings)
    .delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, receivingsServices.deleteItemInReceivings)

module.exports = router