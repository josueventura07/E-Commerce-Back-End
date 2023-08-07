const uuid = require('uuid')

const Carts = require('../models/carts.models')
const Products = require('../models/products.models')
const imgsCatalogs = require('../models/images_catalog.models')

const findMyCart = async (profileId) => {
    const data = await Carts.findAll({
        where: {
            profileId: profileId
        },
        attributes: {
            exclude: ['productId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Products,
                attributes: ['id','productName', 'price'],
                include: [
                    {
                        model: imgsCatalogs,
                        attributes: ['imgUrl']
                    }
                ]
            }
            
        ]
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

const delProductInCart = async (productId) => {
    const data = await Carts.destroy({
        where: {
            productId: productId
        }
    })

    return data[0]
}

const updateCart = async (id, obj) => {
    const data = await Carts.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const cleanCart = async () => {
    const data = await Carts.destroy({
        truncate: true
    })

    return data[0]
}

module.exports = {
    findMyCart,
    createItemInCart,
    updateCart,
    delProductInCart,
    cleanCart
}