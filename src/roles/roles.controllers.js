const uuid = require('uuid')

const Roles = require('../models/roles.models')

const findAllRoles = async() => {
    const data = Roles.findAll()

    return data
}

const findRoleById = async (id) => {
    const data = Roles.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findRoleByName = async (name) => {
    const data = await Roles.findOne({
        where: {
            name: name
        }
    })

    return data.id
}

const createRole = async (obj) => {
    const data = Roles.create({
        id: uuid.v4(),
        name: obj.name
    })

    return data
}

module.exports = {
    findAllRoles,
    findRoleById,
    findRoleByName,
    createRole
}