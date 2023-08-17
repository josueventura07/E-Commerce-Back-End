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

const getAllMyReceivings = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    receivingsControllers.findAllMyReceivings(profileId)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postNewItemInReceivings = async (req, res) => {
    const userId = req.user.id
    const {productId, cost, quantity} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    receivingsControllers.createItemInReceivings({profileId, productId, cost, quantity})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const pathItemInReceivings = (req, res) => {
    const id = req.params.id
    const {cost, quantity} = req.body
    receivingsControllers.updateItemInReceivings(id, {cost, quantity})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `item updated successfully`})
        } else {
            res.status(404).json({message: 'Invalid Id'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteItemInReceivings = (req, res) => {
    const id = req.params.id
    receivingsControllers.delItemInReceivings(id)
    .then((data) => {
        if(data) {
            res.status(204).json({message: `Item deleted successfully`})
        } else {
            res.status(404).json({message: 'Invalid Id'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}



module.exports = {
    getAllReceivings,
    getAllMyReceivings,
    postNewItemInReceivings,
    pathItemInReceivings,
    deleteItemInReceivings
}