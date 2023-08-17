const router =  require('express').Router()

const categoriesServices = require('./categories.services')
const passportJWT = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.route('/')
    .get(categoriesServices.getAllCategories)
    .post(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, categoriesServices.postCategory)

router.route('/:id')
    .get(categoriesServices.getCategoryById)
    .patch(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, categoriesServices.pathCategory)
    .delete(passportJWT.authenticate('jwt', {session: false}), roleMiddleware, categoriesServices.deleteCategory)


module.exports = router
