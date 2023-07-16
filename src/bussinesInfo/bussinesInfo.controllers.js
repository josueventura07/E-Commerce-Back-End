const uuid = require('uuid')

const BussinesInfo = require('../models/bussines_info.models')


const findAllBussinesInfo = async () => {
    const data = await BussinesInfo.findAll({
        where: {
            status: true
        }
    })

    return data
}

const findBussineInfoById = async (id) => {
    const data = await BussinesInfo.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findBussineInfoByName = async (name) => {
    const data = await BussinesInfo.findOne({
        where: {
            name: name
        }
    })

    return data.id
}

const createBussineInfo = async (obj) => {
    const data = await BussinesInfo.create({
        id: uuid.v4(),
        name: obj.name,
        phone: obj.phone,
        address: obj.address        
    })
    return data
}

const updateBussineInfo = async (id, obj) => {
    const data = await BussinesInfo.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const deleteBussineInfo = async (id) => {
    const data = await BussinesInfo.update({
        status: false
    }, {
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllBussinesInfo,
    findBussineInfoById,
    findBussineInfoByName,
    createBussineInfo,
    updateBussineInfo,
    deleteBussineInfo
}