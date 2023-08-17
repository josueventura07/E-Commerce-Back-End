const router = require('express').Router()

const unitOfMeasureServices = require('./unitOfMeasures.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
    .get(unitOfMeasureServices.getAllUnitOfMeasures)
    .post(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, unitOfMeasureServices.postUnitOfMeasure)

router.route('/:id')
    .get(unitOfMeasureServices.getUnitOfMeasureById)    
    .patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, unitOfMeasureServices.pathUnitOfMeasure)
    .delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, unitOfMeasureServices.deleteUnitOfMeasure)

module.exports = router