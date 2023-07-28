const ordersControllers = require('./orders.controllers')
const ordersDetailsControllers = require('../orders_details/ordersDetails.controllers')
const profilesController = require('../profiles/profiles.controllers')

const getAllOrders = (req, res) => {
    ordersControllers.findAllOrders()
    .then((data) => {
        res.status(200).json({status: 'success', purchases: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postOrder = async (req, res) => {
    const userId = req.user.id
    const orderInfo = req.body
    const profileId = await profilesController.findProfileIdByUserId(userId)
        
    const detailProducts = orderInfo
    let amount = 0
        orderInfo.forEach(element => {
           if(element.price) {
                amount = amount + element.price * element.quantity
            }      
        });
        
    ordersControllers.createOrder({profileId, amount})

        .then((data) => {
            const orderId = data.id
          detailProducts.forEach( element => {
            if(!element.amount) {
            
                const productId = element.productId
                const price = element.price
                const quantity = element.quantity
                ordersDetailsControllers.createProductsOrder({orderId, productId, price, quantity})
            }
        });
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    
    
    
}

module.exports = {
    getAllOrders,
    postOrder
}