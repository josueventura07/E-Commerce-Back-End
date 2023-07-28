const usersControllers = require('./users.controllers')
//const mailer = require('../utils/mailer')
//const config = require('../../config')
const profilesControllers = require('../profiles/profiles.controllers')
const rolesControllers = require('../roles/roles.controllers')


const getAllUsers = (req, res) => {
    usersControllers.findAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.findUserById(id)
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

const getMyUser = (req, res) => {
    const id = req.user.id 
    usersControllers.findUserById(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}


const postUser = (req, res) => {
    const {firstName, lastName, email, password, userName} = req.body
    usersControllers.createUser({firstName, lastName, email, password,userName})
    .then(async (data) => {
        const userId = data.id
        const defaultRole = 'client'
        const roleId = await rolesControllers.findRoleByName(defaultRole)
        await profilesControllers.createProfile({userId, roleId})
        res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                firstName: 'String',
                lastName: 'String',
                email: 'example@example.com',
                password: 'String',
                userName: 'String'
            }})
        })
        
}

//? Solo admins pueden ejecutarlo
const patchUser = (req, res) => {
    const id = req.params.id 
    const {firstName, lastName, email, status} = req.body
    
    usersControllers.updateUser(id, {firstName, lastName, email, status})
        .then((data) =>{
            if(data){
                res.status(200).json({message: `User edited succesfully with id: ${id}`})
            } else {
                res.status(404).json({message: `User with id: ${id}, not found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName } = req.body
    usersControllers.updateUser(id, {firstName, lastName})
        .then(() => {
            res.status(200).json({message: 'Your user was edited succesfully!'})
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

//? Solo admins pueden ejecutarlo
const deleteUser = (req, res) => {
    const id = req.params.id 
    usersControllers.deleteUser(id)
        .then((data) => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: `User with id:${id}, Not Found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id 
    usersControllers.deleteUser(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports= {
    getAllUsers,
    getMyUser,
    getUserById,
    postUser,
    patchMyUser,
    patchUser,
    deleteMyUser,
    deleteUser
}