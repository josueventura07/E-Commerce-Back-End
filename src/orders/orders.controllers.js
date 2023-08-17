const uuid = require('uuid')

const Orders = require('../models/orders.models')
const Products = require('../models/products.models')
const OrdersDetails = require('../models/detail_orders.models')
const ImgsCatalog = require('../models/images_catalog.models')

const findAllOrders = async () => {
    const data = await Orders.findAll({
        where: {
            status: true
        },
        include: [
            {
                model: OrdersDetails,
                attributes: { 
                    exclude: ['id', 'orderId', 'productId', 'price', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Products,
                        attributes: { 
                            exclude: ['comment', 'status', 'createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: ImgsCatalog,
                                attributes: ['imgUrl']
                            }
                        ]
                    }
                ]
            }
        ]
    })

    return data
}

const findAllMyOrders = async (profileId) => {
    const data = await Orders.findAll({
        where: {
            profileId: profileId,
            status: true
        },
        include: [
            {
                model: OrdersDetails,
                attributes: { 
                    exclude: ['id', 'orderId', 'productId', 'price', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Products,
                        attributes: { 
                            exclude: ['comment', 'status', 'createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: ImgsCatalog,
                                attributes: ['imgUrl']
                            }
                        ]
                    }
                ]
            }
        ]
})

    return data
}

const createOrder = async (obj) => {
    const data = await Orders.create({
        id: uuid.v4(),
        profileId: obj.profileId,
        amount: obj.amount
    })

    return data
}

module.exports = {
    findAllOrders,
    findAllMyOrders,
    createOrder
}