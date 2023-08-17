const productsControllers = require('./products.controllers')
//const unitOfMeasuresControllers = require('../unitOfMeasure/unitOfMeasures.controllers')
//const categoriesControllers = require('../categories/categories.controllers')

const getAllProducts = (req, res) => {
    const category = req.query.category;

    if(category) {
        productsControllers.findAllProductsByCategory(category)
        .then((data) => {
            if(data.length !== 0){
                res.status(200).json({status: 'success', products: data})
            } else {
                res.status(404).json({message: 'Category not found'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    } else {
        productsControllers.findAllProducts()
        .then((data) => {
            res.status(200).json({status: 'success', products: data})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    }
}

const getAllStocks = (req, res) => {
    productsControllers.findAllStocks()
    .then((data) => {
       res.status(200).json({status: 'success', products: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}


const getProductById = (req, res) => {
    const id = req.params.id
    productsControllers.findProductById(id)
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postProduct = async (req, res) => {
    const {productName, description, unitOfMeasureId, categoryId, price, comment} = req.body
    
    productsControllers.createProduct({productName, description, unitOfMeasureId, categoryId, price, comment})
    .then((data)=> {
        res.status(201).json(data)
    })
    .catch((err)=> {
        res.status(400).json({message: err.message, fields: {
            productName: 'String',
            description: 'String',
            unitOfMeasureId: 'Integer',
            categoryId: 'Integer',
            price: 'Float',
            comment: 'String'
        }})
    })
}

const patchProduct = (req, res) => {
    const id = req.params.id
    const {productName, description, unitOfMeasureId, categoryId, price, comment} = req.body
    productsControllers.updateProduct(id, {productName, description, unitOfMeasureId, categoryId, price, comment})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `Product with id: ${id} updated successfully`})
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteProduct = (req, res) => {
    const id = req.params.id
    productsControllers.delProduct(id, {status: false})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `Product with id: ${id} deleted successfully`})
        } else {
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllProducts,
    getAllStocks,
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
}