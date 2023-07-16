const router = require('express').Router()

const productsServices = require('./products.services')

router.route('/')
.get(productsServices.getAllProducts)
.post(productsServices.postProduct)

router.route('/:id')
.get(productsServices.getProductById)


module.exports = router