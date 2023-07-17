
const ImgsCatalog = require('../models/images_catalog.models')

const findAllImgsCatalog = async () => {
    const data = await ImgsCatalog.findAll()

    return data
}

const findImgCatalogById = async (id) => {
    const data = await ImgsCatalog.findOne({
        where: {
            id: id
        }
    })

    return data
}

const createImgCatalog = async (obj) => {
    const data = await ImgsCatalog.create({
        productId: obj.productId,
        imgUrl: obj.imgUrl
    })

    return data
}

module.exports = {
    findAllImgsCatalog,
    findImgCatalogById,
    createImgCatalog
}