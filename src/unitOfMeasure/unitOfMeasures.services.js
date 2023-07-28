const unitOfMeasuresControllers = require('./unitOfMeasures.controllers')

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
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postUnitOfMeasure = (req, res) => {
    const {name} = req.body
    unitOfMeasuresControllers.createUnitOfMeasure({name})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllUnitOfMeasures,
    getUnitOfMeasureById,
    postUnitOfMeasure
}