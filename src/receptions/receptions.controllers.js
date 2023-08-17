const uuid = require('uuid')

const Receptions = require('../models/receptions.models')
const Products = require('../models/products.models')
const ImgsCatalog = require('../models/images_catalog.models')
const Detail_receptions = require('../models/detail_receptions.models')

const findAllReceptions = async () => {
    const data = await Receptions.findAll({
        where: {
            status: true
        },
        include: [
                {
                    model: Detail_receptions,
                    attributes: {
                        exclude: ['receptionId', 'id', 'productId', 'createdAt', 'updatedAt'],
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

const findAllMyReceptions = async (profileId) => {
    const data = await Receptions.findAll({
        where: {
            profileId: profileId,
            status: true
        },
        include: [
            {
                model: Detail_receptions,
                attributes: {
                    exclude: ['receptionId', 'id', 'productId', 'createdAt', 'updatedAt'],
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

const createReception = async (obj) => {
    const data = await Receptions.create({
        id: uuid.v4(),
        supplierName: obj.supplierName,
        invoiceNumber: obj.invoiceNumber,
        profileId: obj.profileId,
        amount: obj.amount
    })

    return data
}

module.exports = {
    findAllReceptions,
    findAllMyReceptions,
    createReception
}