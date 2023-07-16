
const { NUMBER } = require('sequelize')
const UnitOfMeasures = require('../models/unit_of_measures.models')

const findAllUnitOfMeasures = async () => {
    const data = await UnitOfMeasures.findAll()

    return data
}

const findUnitOfMeasureById = async (id) => {
    const data = await UnitOfMeasures.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findUnitOfMeasureByName = async (name) => {
    const data = await UnitOfMeasures.findOne({
        where: {
            name: name
        }
    })

    return data.id
}

const createUnitOfMeasure = async (obj) => {
    const data = await UnitOfMeasures.create({
        name: obj.name
    })

    return data
}

module.exports = {
    findAllUnitOfMeasures,
    findUnitOfMeasureById,
    findUnitOfMeasureByName,
    createUnitOfMeasure
}