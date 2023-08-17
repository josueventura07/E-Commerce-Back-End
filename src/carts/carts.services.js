const cartsControllers = require('./carts.controllers')
const profilesControllers = require('../profiles/profiles.controllers')
//const productsControllers = require('../products/products.controllers')

const getAllCarts = (req, res) => {
    cartsControllers.findAllCarts()
    .then((data) => {
        res.status(200).json({status: 'success', carts: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}


const getAllProductsInMyCart = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    await cartsControllers.findAllProductsInMyCart(profileId)
    .then((data) => {
        res.status(200).json({status: 'success', cart: data})
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

const patchProductInCart = (req, res) => {
    const {quantity} = req.body
    const id = req.params.id
    cartsControllers.updateProductInCart(id, {quantity})
    .then((data) => {
        if(data) {
            res.status(200).json({status: 'updated successfully'})
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
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


module.exports = {
    getAllCarts,
    getAllProductsInMyCart,
    postNewItemInCart,
    patchProductInCart,
    deleteProductInCart
}