const uuid = require('uuid')

const Receivings = require('../models/receivings.models')

const findAllReceivings = async () => {
    const data = await Receivings.findAll()

    return data
}

const findMyReceivings = async (profileId) => {
    const data = await Receivings.findAll({
        where: {
            profileId: profileId
        }
    })

    return data
}

const createReceiving = async (obj) => {
    const data = await Receivings.create({
        id: uuid.v4(),
        profileId: obj.profileId,
        productId: obj.productId,
        quantity: obj.quantity
    })

    return data
}

module.exports = {
    findAllReceivings,
    findMyReceivings,
    createReceiving
}