
const UnitOfMeasures = require('../models/unit_of_measures.models')

const findAllUnitOfMeasures = async () => {
    const data = await UnitOfMeasures.findAll({
        where: {
            status: true
        }
    })

    return data
}

const findUnitOfMeasureById = async (id) => {
    const data = await UnitOfMeasures.findOne({
        where: {
            id: id,
            status: true
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
        name: obj.name,
        profileId: obj.profileId
    })

    return data
}

const updateUnitOfMeasure = async (id, obj) => {
    const data = await UnitOfMeasures.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delUnitOfMeasure = async (id) => {
    const data = await UnitOfMeasures.update({
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllUnitOfMeasures,
    findUnitOfMeasureById,
    findUnitOfMeasureByName,
    createUnitOfMeasure,
    updateUnitOfMeasure,
    delUnitOfMeasure
}