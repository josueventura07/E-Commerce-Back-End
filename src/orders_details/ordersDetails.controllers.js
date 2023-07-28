

const Detail_orders = require('../models/detail_orders.models')

const createProductsOrder = async (obj) => {
    const data = await Detail_orders.create({
        orderId: obj.orderId,
        productId: obj.productId,
        price: obj.price,
        quantity: obj.quantity
    
    })

    return data
}

module.exports = {
    createProductsOrder
}