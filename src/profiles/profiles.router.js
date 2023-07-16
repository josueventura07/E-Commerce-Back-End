const router = require('express').Router()

const profilesServices = require('./profiles.services')


router.route('/')
.get(profilesServices.getAllProfiles)


router.route('/:id')
.get(profilesServices.getProfileById)


module.exports = router