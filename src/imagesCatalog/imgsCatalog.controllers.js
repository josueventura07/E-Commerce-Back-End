
const ImgsCatalog = require('../models/images_catalog.models')

const findAllImgsCatalog = async () => {
    const data = await ImgsCatalog.findAll({
        where: {
            status: true
        }
    })

    return data
}

const findImgCatalogById = async (id) => {
    const data = await ImgsCatalog.findOne({
        where: {
            id: id,
            status: true
        }
    })

    return data
}

const createImgCatalog = async (obj) => {
    const data = await ImgsCatalog.create({
        productId: obj.productId,
        imgUrl: obj.imgUrl,
        profileId: obj.profileId
    })

    return data
}

const updateImgCatalog = async (id, obj) => {
    const data = await ImgsCatalog.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delImgCatalog = async (id) => {
    const data = await ImgsCatalog.update({
        where: {
            id: id
        }
    })
    return data[0]
}

module.exports = {
    findAllImgsCatalog,
    findImgCatalogById,
    createImgCatalog,
    updateImgCatalog,
    delImgCatalog
}