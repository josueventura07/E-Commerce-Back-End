

const Categories = require('../models/categories.models') 

const findAllCategories = async () => {
    const data = await Categories.findAll({
        where: {
            status: true
        }
    })

    return data
}

const findCategoryById = async (id) => {
    const data = await Categories.findOne({
        where: {
            id: id,
            status: true
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
        name: obj.name,
        profileId: obj.profileId
    })

    return data
}

const updateCategory = async (id, obj) => {
    const data = await Categories.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delCategory = async (id) => {
    const data = await Categories.update({
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllCategories,
    findCategoryById,
    findCategoryByName,
    createCategory,
    updateCategory,
    delCategory
}