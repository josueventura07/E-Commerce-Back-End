const rolesControllers = require('./roles.controllers')

const getAllRoles = (req, res) => {
    rolesControllers.findAllRoles()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getRoleById = (req, res) => {
    const id = req.params.id
    rolesControllers.findRoleById(id)
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

const postRole = (req, res) => {
    const {name} = req.body
    rolesControllers.createRole({name})
    .then((data) => {
        res.status(201).json(data)       
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllRoles,
    getRoleById,
    postRole
}