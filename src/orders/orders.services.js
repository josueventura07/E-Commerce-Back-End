const ordersControllers = require('./orders.controllers')
const ordersDetailsControllers = require('../orders_details/ordersDetails.controllers')
const profilesControllers = require('../profiles/profiles.controllers')
const cartProductsControllers = require('../carts/carts.controllers') 

const getAllOrders = async (req, res) => {
    
    ordersControllers.findAllOrders()
    .then((data) => {
        res.status(200).json({status: 'success', purchases: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getAllMyOrders = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    ordersControllers.findAllMyOrders(profileId)
    .then((data) => {
        res.status(200).json({status: 'success', purchases: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postOrder = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    const cartProducts = await cartProductsControllers.findAllProductsInMyCart(profileId) 
    const detailProducts = cartProducts
    let amount = 0
    cartProducts.forEach(element => {
            if(element.dataValues.product.dataValues.price) {
                amount = amount + element.dataValues.product.dataValues.price * element.dataValues.quantity
            }      
        });
        
    await ordersControllers.createOrder({profileId, amount})

        .then((data) => {
            const orderId = data.id
            detailProducts.forEach( element => {
                                
                    const productId = element.dataValues.product.dataValues.id
                    const price = element.dataValues.product.dataValues.price
                    const quantity = element.dataValues.quantity
                    ordersDetailsControllers.createProductsOrder({orderId, productId, price, quantity})
                
            });
            cartProductsControllers.cleanCart()
            res.status(201).json({  status: 'received successfully'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    
    
    
}

module.exports = {
    getAllOrders,
    getAllMyOrders,
    postOrder
}