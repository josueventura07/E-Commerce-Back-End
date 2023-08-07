const uuid = require('uuid')

const Receptions = require('../models/receptions.models')
const Products = require('../models/products.models')

const findAllReceptions = async () => {
    const data = await Receptions.findAll({
        include: [
            {
                model: Products,
                attributes: ['productName']
            }
        ]
    })

    return data
}

const createReception = async (obj) => {
    const data = await Receptions.create({
        id: uuid.v4(),
        supplierName: obj.supplierName,
        invoiceNumber: obj.invoiceNumber,
        profileId: obj.profileId,
        amount: obj.amount
    })

    return data
}

module.exports = {
    findAllReceptions,
    createReception
}