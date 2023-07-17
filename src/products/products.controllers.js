
const Products = require('../models/products.models')
const UnitOfMeasures = require('../models/unit_of_measures.models')
const Categories = require('../models/categories.models')

const findAllProducts = async () => {
    const data = await Products.findAll({
        where: {
            status: true
        },
        attributes: {
            exclude: ['unitOfMeasureId', 'categoryId']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['name']
        }, {
            model: Categories,
            attributes: ['name']
        }]
    })

    return data
}

const findProductById = async (id) => {
    const data = await Products.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findProductByName = async (name) => {
    const data = await Products.findOne({
        where: {
            name: name
        }
    })

    return data.id
}

const createProduct = async (obj) => {
    const data = Products.create({
        productName: obj.productName,
        description: obj.description,
        unitOfMeasureId: obj.unitOfMeasureId,
        categoryId: obj.categoryId,
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
    findProductByName,
    createProduct,
    updateProduct,
    deleteProduct
}