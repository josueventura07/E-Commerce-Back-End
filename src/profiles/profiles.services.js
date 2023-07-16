const profilesControllers = require('./profiles.controllers')
const usersControllers = require('../users/users.controllers')
const bussinesInfoControllers = require('../bussinesInfo/bussinesInfo.controllers')

const getAllProfiles = (req, res) => {
    profilesControllers.findAllProfiles()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getProfileById = (req, res) => {
    const id = req.params.id
    profilesControllers.findProfileById(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllProfiles,
    getProfileById
}