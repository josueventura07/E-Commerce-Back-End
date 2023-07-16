const uuid = require('uuid')

const Profiles = require('../models/profiles.models')

const findAllProfiles = async () => {
    const data = Profiles.findAll({
        where: {
            status: true
        }
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

const createProfile = async(obj) => {
    const data = Profiles.create({
        id: uuid.v4(),
        bussinesInfoId: obj.bussineInfoId,
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
    createProfile,
    activeProfile,
    deleteProfile
}