const uuid = require('uuid')

const BussinesAdministrators = require('../models/BussinesAdministrators.models')
const Users = require('../models/users.models')
const Bussines = require('../models/bussines.models')


const findAllMyBussines = async (userId) => {
    const data = await BussinesAdministrators.findAll({
        where: {
            userId: userId
        },
        attributes: {
            exclude: ['userId', 'bussineId', 'createdAt', 'updatedAt']
        },
        include: [
           {
            model: Bussines,
            attributes: ['bussineName', 'phone', 'address', 'city', 'country', 'createdAt', 'updatedAt']
           },
           {
            model: Users,
            attributes: ['firstName', 'lastName']
           }
        ]
      
    })

    return data
}

const createBussineAdministrator = async (obj) => {
    const data = await BussinesAdministrators.create({
        id: uuid.v4(),
        userId: obj.userId,
        bussineId: obj.bussineId
    })

    return data
}

module.exports = {
    createBussineAdministrator,
    findAllMyBussines
}