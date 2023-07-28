const bussinesControllers = require('./bussines.controllers')
const rolesControllers = require('../roles/roles.controllers')
const bussinesAdministratorsControllers = require('../bussinesAdministrators/bussinesAdministrators.controllers')
const profilesControllers = require('../profiles/profiles.controllers')
const usersBussineControllers = require('../users/users.controllers')

const getAllBussines = (req, res) => {
    bussinesControllers.findAllBussines()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getBussineById = (req, res) => {
    const id = req.params.id
    bussinesControllers.findBussineById(id)
    .then((data) => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid Id'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getAllBussineUsers = (req, res) => {
    const bussineId = req.params.id
    usersBussineControllers.findAllUserByBussineId(bussineId)
    .then((data) => {
        if(data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({message: 'Invalid bussineId'})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postBussine = (req, res) => {
    const {bussineName, phone, address, city, country} = req.body
    
    bussinesControllers.createBussine({bussineName, phone, address, city, country})
    .then(async (data) => {
        const userId = req.user.id
        const bussineId = data.id
        const roleId = await rolesControllers.findRoleByName('admin')
        await bussinesAdministratorsControllers.createBussineAdministrator({userId, bussineId})
        await profilesControllers.createBussineAdministrator(userId, {roleId})
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message, fields: {
            bussineName: 'String',
            phone: 'String',
            address: 'String'
        }})
    })

}

const postBussineUser = (req, res) => {
    const {firstName, lastName, email, password, userName} = req.body
    const bussineId = req.params.id

    usersBussineControllers.createUser({bussineId, firstName, lastName, email, password, userName})
    .then(async (data) => {
        const userId = data.id
        const defaultRole = 'client'
        const roleId = await rolesControllers.findRoleByName(defaultRole)
        await profilesControllers.createProfile({userId, roleId})
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message, fields: {
            bussineName: 'String',
            firstName: 'String',
            lastName: 'String',
            email: 'example@example.com',
            password: 'String',
            userName: 'String'
        }})
    })

}

const patchBussine = (req, res) => {
    const {id} = req.params.id
    const {name, phone, address} = req.body

    bussinesControllers.updateBussine(id, {name, phone, address})
    .then((data) => {
        if(data) {
            res.status(200).json({message: `Bussine with Id: ${id}, edited Successfully`})
        } else {
            res.status(404).json({message: `Bussine with Id: ${id}, not found`})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const deleteBussine = (req, res) => {
    const {id} = req.params.id
    bussinesControllers.deleteBussine(id)
    .then((data) => {
        if(data) {
            res.status(204).json()
        } else {
            res.status(404).json({message: `Bussine with Id: ${id}, not found`})
        }
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllBussines,
    getBussineById,
    getAllBussineUsers,
    postBussine,
    postBussineUser,
    patchBussine,
    deleteBussine
}