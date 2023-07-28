const receivingsControllers = require('./receivings.controllers')
const profilesControllers = require('../profiles/profiles.controllers')

const getAllReceivings = (req, res) => {
    receivingsControllers.findAllReceivings()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getMyReceivings = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    receivingsControllers.findMyReceivings(profileId)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postReceiving = async (req, res) => {
    const userId = req.user.id
    const {productId, quantity} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    receivingsControllers.createReceiving({profileId, productId, productId, quantity})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}


module.exports = {
    getAllReceivings,
    getMyReceivings,
    postReceiving
}