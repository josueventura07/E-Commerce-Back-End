const Carts = require('../models/carts.models')
const Products = require('../models/products.models')
const imgsCatalogs = require('../models/images_catalog.models')
const Profiles = require('../models/profiles.models')
const Users = require('../models/users.models')

const findAllCarts = async () => {
    const data = await Carts.findAll({
        attributes: {
            exclude: ['productId', 'createdAt']
        },
        include: [
            {
                model: Profiles,
                attributes: {
                    exclude: ['id', 'roleId', 'status', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                      model: Users,
                      attributes: ['userName']  
                    }
                ]                
            },
            {
                model: Products,
                attributes: ['id','productName', 'price'],
                include: [
                    {
                        model: imgsCatalogs,
                        attributes: ['imgUrl']
                    }
                ]
            }
            
        ]
    })

    return data
}


const findAllProductsInMyCart = async (profileId) => {
    const data = await Carts.findAll({
        where: {
            profileId: profileId
        },
        attributes: {
            exclude: ['productId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Products,
                attributes: ['id','productName', 'price'],
                include: [
                    {
                        model: imgsCatalogs,
                        attributes: ['imgUrl']
                    }
                ]
            }
            
        ]
    })

    return data
}

const createItemInCart = async (obj) => {
    const data = await Carts.create({
        profileId: obj.profileId,
        productId: obj.productId,
        quantity: obj.quantity
    })
    
    return data
}

const updateProductInCart = async (id, obj) => {
    const data = await Carts.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delProductInCart = async (productId) => {
    const data = await Carts.destroy({
        where: {
            productId: productId
        }
    })

    return data[0]
}

const cleanCart = async () => {
    const data = await Carts.destroy({
        truncate: true
    })

    return data[0]
}

module.exports = {
    findAllCarts,
    findAllProductsInMyCart,
    createItemInCart,
    updateProductInCart,
    delProductInCart,
    cleanCart
}