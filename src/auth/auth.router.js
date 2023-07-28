const router = require('express').Router()
const authServices = require('./auth.services')

router.post('/', authServices.postLogin)
/*
router.post('/recovery-password', authServices.postRecoveryToken)
router.patch('/recovery-password/:id', authServices.patchPassword)
*/
module.exports = router