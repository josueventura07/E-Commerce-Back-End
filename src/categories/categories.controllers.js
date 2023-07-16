

const Categories = require('../models/categories.models') 

const findAllCategories = async () => {
    const data = await Categories.findAll()

    return data
}

const findCategoryById = async (id) => {
    const data = await Categories.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findCategoryByName = async (name) => {
    const data = await Categories.findOne({
        where: {
            name: name
        }
    })

    return data.id
}

const createCategory = async (obj) => {
    const data = await Categories.create({
        name: obj.name
    })

    return data
}

module.exports = {
    findAllCategories,
    findCategoryById,
    findCategoryByName,
    createCategory
}