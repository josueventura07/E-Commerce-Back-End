const unitOfMeasuresControllers = require('./unitOfMeasures.controllers')
const profilesControllers = require('../profiles/profiles.controllers')

const getAllUnitOfMeasures = (req, res) => {
    unitOfMeasuresControllers.findAllUnitOfMeasures()
    .then((data) => {
        res.status(200).json({status: 'success', unitOfMeasure: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getUnitOfMeasureById = (req, res) => {
    const id = req.params.id
    unitOfMeasuresControllers.findUnitOfMeasureById(id)
    .then((data) => {
        if(data){
            res.status(200).json({status: 'success', unitOfMeasure: data})
        } else {
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postUnitOfMeasure = async (req, res) => {
    const userId = req.user.id
    const {name} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    unitOfMeasuresControllers.createUnitOfMeasure({name, profileId})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const pathUnitOfMeasure = (req, res) => {
    const {name} = req.body
    const id = req.params.id
    unitOfMeasuresControllers.updateUnitOfMeasure(id, {name})
    .then((data) => {
        if(data) {
            res.status(200).json({message: 'Unit of measure was edited succesfully!'})
        } else {
            res.status(404).json({message: `Unit of Measure with id:${id}, Not Found`})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteUnitOfMeasure = (req, res) => {
    const id = req.params.id
    unitOfMeasuresControllers.updateUnitOfMeasure(id, {status: false})
    .then((data) => {
        if(data) {
            res.status(204).json({message: 'Unit of measure deleted successfully'})
        } else {
            res.status(404).json({message: `Unit of Measure with id:${id}, Not Found`})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllUnitOfMeasures,
    getUnitOfMeasureById,
    postUnitOfMeasure,
    pathUnitOfMeasure,
    deleteUnitOfMeasure
}