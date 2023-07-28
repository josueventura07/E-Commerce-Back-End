const uuid = require('uuid')

const Orders = require('../models/orders.models')
const Products = require('../models/products.models')
const OrdersDetails = require('../models/detail_orders.models')


const findAllOrders = async () => {
    const data = await Orders.findAll({
        include: [
           
            {
                model: Products,
                attributes: ['productName', 'price']
            }
        ]
    })

    return data
}

const createOrder = async (obj) => {
    const data = await Orders.create({
        id: uuid.v4(),
        profileId: obj.profileId,
        comment: obj.comment,
        amount: obj.amount
    })

    return data
}

module.exports = {
    findAllOrders,
    createOrder
}