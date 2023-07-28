

const Detail_receptions = require('../models/detail_receptions.models')

const createProductReception = async (obj) => {
    const data = await Detail_receptions.create({
        receptionId: obj.receptionId,
        productId: obj.productId,
        cost: obj.cost,
        quantity: obj.quantity
    
    })

    return data
}

module.exports = {
    createProductReception
}