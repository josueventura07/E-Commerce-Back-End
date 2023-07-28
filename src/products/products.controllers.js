
const Products = require('../models/products.models')
const UnitOfMeasures = require('../models/unit_of_measures.models')
const Categories = require('../models/categories.models')
const productImgs = require('../models/images_catalog.models')

const findAllProducts = async () => {
    const data = await Products.findAll({
        where: {
            status: true
        },
        attributes: {
            exclude: ['unitOfMeasureId', 'categoryId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['id','name']
        }, {
            model: Categories,
            attributes: ['id', 'name']
        }, {
            model: productImgs,
            attributes: ['imgUrl']
        }]
    })

    return data
}

const findProductById = async (id) => {
    const data = await Products.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['categoryId', 'unitOfMeasureId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['name']
        }, {
            model: Categories,
            attributes: ['name']
        }, {
            model: productImgs,
            attributes: ['imgUrl']
        }]
    })

    return data
}

const findAllProductsByCategory = async (category) => {
    const data = await Products.findAll({
        where: {
            categoryId: category
        },
        attributes: {
            exclude: ['categoryId', 'unitOfMeasureId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['id','name']
        }, {
            model: Categories,
            attributes: ['id', 'name']
        }, {
            model: productImgs,
            attributes: ['imgUrl']
        }]
    })

    return data
}

const findProductByName = async (productName) => {
    const data = await Products.findOne({
        where: {
            productName: productName
        }
    })

    return data.id
}

const createProduct = async (obj) => {
    const data = await Products.create({
        productName: obj.productName,
        description: obj.description,
        unitOfMeasureId: obj.unitOfMeasureId,
        categoryId: obj.categoryId,
        price: obj.price,
        comment: obj.comment
    })

    return data
}

const updateProduct = async (id, obj) => {
    const data = await Products.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const deleteProduct = async (id) => {
    const data = await Products.update({
        status: false
    }, {
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllProducts,
    findProductById,
    findAllProductsByCategory,
    findProductByName,
    createProduct,
    updateProduct,
    deleteProduct
}