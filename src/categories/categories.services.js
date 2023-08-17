
const categoriesControllers = require('./categories.controllers')
const profilesControllers = require('../profiles/profiles.controllers')

const getAllCategories = (req, res) => {
    categoriesControllers.findAllCategories()
    .then((data) => {
        res.status(200).json({status: 'success', categories: data})
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getCategoryById = (req, res) => {
    const id = req.params.id
    categoriesControllers.findCategoryById(id)
    .then((data) => {
        if(data){
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postCategory = async (req, res) => {
    const userId = req.user.id
    const {name} = req.body
    const profileId = await profilesControllers.findProfileIdByUserId(userId)
    categoriesControllers.createCategory({name, profileId})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const pathCategory = (req, res) => {
    const {name} = req.body
    const id = req.params.id
    categoriesControllers.updateCategory(id, {name})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `Category with id: ${id} updated successfully`})
        } else {
            res.status(404).json({message: 'Invalid or not available ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteCategory = (req, res) => {
    const id = req.params.id
    categoriesControllers.delCategory(id, {status: false})
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
    getAllCategories,
    getCategoryById,
    postCategory,
    pathCategory,
    deleteCategory
}