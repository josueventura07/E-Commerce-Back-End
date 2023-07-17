const router = require('express').Router()

const imgsCatalogServices = require('./imgsCatalog.services')

router.route('/')
.get(imgsCatalogServices.getAllImgsCatalog)
.post(imgsCatalogServices.postImgCatalog)

router.route('/:id')
.get(imgsCatalogServices.getImgCatalogById)


module.exports = router