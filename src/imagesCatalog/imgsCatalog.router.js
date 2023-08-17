const router = require('express').Router()

const imgsCatalogServices = require('./imgsCatalog.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
.get(imgsCatalogServices.getAllImgsCatalog)
.post(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, imgsCatalogServices.postImgCatalog)

router.route('/:id')
.get(imgsCatalogServices.getImgCatalogById)
.patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, imgsCatalogServices.pathImgCatalog)
.delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, imgsCatalogServices.deleteImgCatalog)


module.exports = router