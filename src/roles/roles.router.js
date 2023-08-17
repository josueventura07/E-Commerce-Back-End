const router = require('express').Router()

const rolesServices = require('./roles.services')


router.route('/')
.get(rolesServices.getAllRoles)
.post(rolesServices.postRole)

router.route('/:id')
.get(rolesServices.getRoleById)

module.exports = router