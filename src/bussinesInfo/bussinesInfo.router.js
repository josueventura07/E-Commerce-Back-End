const router = require('express').Router()

const bussinesInfoServices = require('./bussinesInfo.services')

router.route('/')
.get(bussinesInfoServices.getAllBussinesInfo)
.post(bussinesInfoServices.postBussineInfo)

router.route('/:id')
.get(bussinesInfoServices.getBussineInfoById)


module.exports = router