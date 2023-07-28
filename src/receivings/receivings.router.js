const router = require('express').Router()

const receivingsServices = require('./receivings.services')
const passportJWT = require('../middlewares/auth.middleware')

router.route('/')
.get(receivingsServices.getAllReceivings)


//? Estas son las rutas para ver y crear recibos en negocio especifico solo admin o employees
router.route('/myReceivings')
.get(passportJWT.authenticate('jwt', {session: false}), receivingsServices.getMyReceivings)
.post(passportJWT.authenticate('jwt', {session: false}), receivingsServices.postReceiving)



module.exports = router