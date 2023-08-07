const cartsControllers = require('./carts.controllers')
const profilesControllers = require('../profiles/profiles.controllers')
//const productsControllers = require('../products/products.controllers')

const getMyItemsCart = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    await cartsControllers.findMyCart(profileId)
    .then((data) => {
        res.status(200).json({status: 'success', cart: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteProductInCart = (req, res) => {
    const productId = req.params.id
    cartsControllers.delProductInCart(productId)
    .then((data) => {
        res.status(200).json({data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postNewItemInCart = async (req, res) => {
    const userId = req.user.id
    const {productId, quantity} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    await cartsControllers.createItemInCart({profileId, productId, quantity})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message, fields: {
            productId: 'integer',
            quantity: 'float'
        }})
    })
} 

module.exports = {
    getMyItemsCart,
    postNewItemInCart,
    deleteProductInCart
}