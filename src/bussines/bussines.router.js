const router = require('express').Router()

const bussinesServices = require('./bussines.services')
//const passportJWT = require('../middlewares/auth.middleware')


router.route('/')
.get(bussinesServices.getAllBussines)
.post(bussinesServices.postBussine)

router.route('/:id')
.get(bussinesServices.getBussineById)

//? Estas son las rutas para ver y crear usuarios en negocio especifico
router.route('/:id/users')
.get(bussinesServices.getAllBussineUsers)
.post(bussinesServices.postBussineUser)




module.exports = router