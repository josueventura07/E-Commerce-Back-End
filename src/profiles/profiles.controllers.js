const uuid = require('uuid')

const Profiles = require('../models/profiles.models')
const Roles = require('../models/roles.models')
const Users = require('../models/users.models')

const findAllProfiles = async () => {
    const data = Profiles.findAll({
        where: {
            status: true
        },
        attributes: {
            exclude: ['userId', 'roleId']
        },
        include: [{
            model: Roles,
            attributes: ['name']
        },
        {
            model: Users,
            attributes: ['firstName', 'lastName']
        }
    ]
    })

    return data
}

const findProfileById = async (id) => {
    const data = Profiles.findOne({
        where: {
            id: id
        }
    })

    return data
}

const findProfileIdByUserId = async (userId) => {
    const data = await Profiles.findOne({
        where: {
            userId: userId
        }
    })

    return data.id
}

const findRoleIdInProfileByUserId = async (userId) => {
    const data = await Profiles.findOne({
        where: {
            userId: userId
        }
    })

    return data.roleId
}

const createProfile = async(obj) => {
    const data = Profiles.create({
        id: uuid.v4(),
        userId: obj.userId,
        roleId: obj.roleId
    })

    return data
}

const activeProfile = async (id) => {
    const data = await Profiles.update({
        status: true
    }, {
        where: {
            id: id
        }   
    })

    return data[0]
}

const createBussineAdministrator = async (userId, obj) => {
    const data = await Profiles.update(obj, {
        where: {
            userId: userId
        }
    })

    return data[0]
}

const deleteProfile = async (id) => {
    const data = await Profiles.update({
        status: false
    }, {
        where: {
            id: id
        }
    })
    return data[0]
}


module.exports = {
    findAllProfiles,
    findProfileById,
    findProfileIdByUserId,
    findRoleIdInProfileByUserId,
    createProfile,
    activeProfile,
    createBussineAdministrator,
    deleteProfile
}