const imgsCatalogControllers = require('./imgsCatalog.controllers')
const productsControllers = require('../products/products.controllers')

const getAllImgsCatalog = (req, res) => {
    imgsCatalogControllers.findAllImgsCatalog()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getImgCatalogById = (req, res) => {
    const id = req.params.id
    imgsCatalogControllers.findImgCatalogById(id)
    .then((data) => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postImgCatalog = async (req, res) => {
    const {productName, imgUrl} = req.body
    const productId = await productsControllers.findProductByName(productName)
    imgsCatalogControllers.createImgCatalog({productId, imgUrl})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllImgsCatalog,
    getImgCatalogById,
    postImgCatalog
}