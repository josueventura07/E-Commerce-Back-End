
const categoriesControllers = require('./categories.controllers')

const getAllCategories = (req, res) => {
    categoriesControllers.findAllCategories()
    .then((data) => {
        res.status(200).json(data)
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
            res.status(404).json({message: 'Invalid ID'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postCategory = (req, res) => {
    const {name} = req.body
    categoriesControllers.createCategory({name})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory
}