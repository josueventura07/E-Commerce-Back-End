const Receivings = require('../models/receivings.models')
const Products = require('../models/products.models')
const ImgsCatalog = require('../models/images_catalog.models')

const findAllReceivings = async () => {
    const data = await Receivings.findAll()

    return data
}

const findAllMyReceivings = async (profileId) => {
    const data = await Receivings.findAll({
        where: {
            profileId: profileId
        },
        include: [
            {
                model: Products,
                attributes: ['productName', 'description'],
                include: {
                    model: ImgsCatalog,
                    attributes: ['imgUrl']
                }
            }
            
        ]
    })

    return data
}

const createItemInReceivings = async (obj) => {
    const data = await Receivings.create({
        profileId: obj.profileId,
        productId: obj.productId,
        cost: obj.cost,
        quantity: obj.quantity
    })

    return data
}

const updateItemInReceivings = async (id, obj) => {
    const data = await Receivings.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delItemInReceivings = async (id) => {
    const data = await Receivings.destroy({
        where: {
            id: id
        }
    })

    return data[0]
}

const cleanReceivings = async () => {
    const data = await Receivings.destroy({
        truncate: true
    })
    
    return data[0]
}

module.exports = {
    findAllReceivings,
    findAllMyReceivings,
    createItemInReceivings,
    updateItemInReceivings,
    delItemInReceivings,
    cleanReceivings
}