const imgsCatalogControllers = require('./imgsCatalog.controllers')
const profilesControllers = require('../profiles/profiles.controllers')

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
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postImgCatalog = async (req, res) => {
    const userId = req.user.id
    const {productId, imgUrl} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId) 
    imgsCatalogControllers.createImgCatalog({productId, imgUrl, profileId})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const pathImgCatalog = (req, res) => {
    const {imgUrl} = req.body
    const id = req.params.id
    imgsCatalogControllers.updateImgCatalog(id, {imgUrl})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `Image Product with id: ${id} updated successfully`})
        } else {
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteImgCatalog = (req, res) => {
    const id = req.params.id
    imgsCatalogControllers.delImgCatalog(id, {status: false})
    .then((data) => {
        if(data) {
            res.status(204).json()
        } else {
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllImgsCatalog,
    getImgCatalogById,
    postImgCatalog,
    pathImgCatalog,
    deleteImgCatalog
}