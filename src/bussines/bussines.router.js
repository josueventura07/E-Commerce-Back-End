const router = require('express').Router()

const bussinesServices = require('./bussines.services')
const passportJWT = require('../middlewares/auth.middleware')
const bussinesAdministratorsServices = require('../bussinesAdministrators/bussinesAdministrators.services')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
.get(bussinesServices.getAllBussines)


router.route('/me')
    .get(passportJWT.authenticate('jwt', {session: false}), bussinesAdministratorsServices.getAllMyBussines)
    .post(passportJWT.authenticate('jwt', {session: false}), bussinesServices.postBussine)
    .patch(passportJWT.authenticate('jwt', {session: false}), bussinesServices.patchBussine)
    .delete(passportJWT.authenticate('jwt', {session: false}), bussinesServices.deleteBussine) 
    


router.route('/:id')
.get(bussinesServices.getBussineById)

//? Estas son las rutas para ver y crear usuarios en negocio especifico
router.route('/:id/users')
.get(bussinesServices.getAllBussineUsers)
.post(bussinesServices.postBussineUser)




module.exports = router