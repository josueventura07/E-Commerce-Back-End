const bussinesInfoControllers = require('./bussinesInfo.controllers')

const getAllBussinesInfo = (req, res) => {
    bussinesInfoControllers.findAllBussinesInfo()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getBussineInfoById = (req, res) => {
    const id = req.params.id
    bussinesInfoControllers.findBussineInfoById(id)
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

const postBussineInfo = (req, res) => {
    const {name, phone, address} = req.body
    bussinesInfoControllers.createBussineInfo({name, phone, address})
    .then((data) => {
        res.status(201).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message, fields: {
            name: 'String',
            phone: 'String',
            address: 'String'
        }})
    })

}

const patchBussineInfo = (req, res) => {
    const {id} = req.params.id
    const {name, phone, address} = req.body

    bussinesInfoControllers.updateBussineInfo(id, {name, phone, address})
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
    bussinesInfoControllers.deleteBussineInfo(id)
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
    getAllBussinesInfo,
    getBussineInfoById,
    postBussineInfo,
    patchBussineInfo,
    deleteBussine
}