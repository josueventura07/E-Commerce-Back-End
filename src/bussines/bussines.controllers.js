const uuid = require('uuid')

const Bussines = require('../models/bussines.models')


const findAllBussines = async () => {
    const data = await Bussines.findAll({
        where: {
            status: true
        }
    })

    return data
}

const findBussineById = async (id) => {
    const data = await Bussines.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findBussineByName = async (name) => {
    const data = await Bussines.findOne({
        where: {
            name: name
        }
    })

    return data
}

const findAllBussineUsers = async (bussineId) => {
    const data = await Bussines.findAll({
        where: {
            bussineId: bussineId
        }
    })

    return data
}

const createBussine = async (obj) => {
    const data = await Bussines.create({
        id: uuid.v4(),
        bussineName: obj.bussineName,
        phone: obj.phone,
        address: obj.address,
        city: obj.city,
        country: obj.country        
    })
    return data
}

const updateBussine = async (id, obj) => {
    const data = await Bussines.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const deleteBussine = async (id) => {
    const data = await Bussines.update({
        status: false
    }, {
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllBussines,
    findBussineById,
    findBussineByName,
    findAllBussineUsers,
    createBussine,
    updateBussine,
    deleteBussine
}