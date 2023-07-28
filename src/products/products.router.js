const router = require('express').Router()

const productsServices = require('./products.services')
const categoriesServices = require('../categories/categories.services')
const unitOfMeasureServices = require('../unitOfMeasure/unitOfMeasures.services')

router.route('/')
.get(productsServices.getAllProducts)
.post(productsServices.postProduct)

router.route('/categories')
.get(categoriesServices.getAllCategories)
.post(categoriesServices.postCategory)

router.route('/unitOfMeasure')
.get(unitOfMeasureServices.getAllUnitOfMeasures)
.post(unitOfMeasureServices.postUnitOfMeasure)

router.route('/:id')
.get(productsServices.getProductById)



module.exports = router