const router = require('express').Router()

const unitOfMeasuresServices = require('./unitOfMeasures.services')

router.route('/')
.get(unitOfMeasuresServices.getAllUnitOfMeasures)
.post(unitOfMeasuresServices.postUnitOfMeasure)

router.route('/:id')
.get(unitOfMeasuresServices.getUnitOfMeasureById)

module.exports = router