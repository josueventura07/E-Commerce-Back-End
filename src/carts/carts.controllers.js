const uuid = require('uuid')

const Carts = require('../models/carts.models')

const findMyCart = async (profileId) => {
    const data = await Carts.findAll({
        where: {
            profileId: profileId
        }
    })

    return data
}

const createItemInCart = async (obj) => {
    const data = await Carts.create({
        id: uuid.v4(),
        profileId: obj.profileId,
        productId: obj.productId,
        quantity: obj.quantity
    })

    return data
}

const updateCart = async (id, obj) => {
    const data = await Carts.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const cleanCart = async (id) => {
    const data = await Carts.destroy()

    return data[0]
}

module.exports = {
    findMyCart,
    createItemInCart,
    updateCart,
    cleanCart
}