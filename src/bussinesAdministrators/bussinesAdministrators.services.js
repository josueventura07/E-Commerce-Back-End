const bussinesAdministratorsControllers = require('./bussinesAdministrators.controllers')

const getAllMyBussines = (req, res) => {
    const userId = req.user.id
    bussinesAdministratorsControllers.findAllMyBussines(userId)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllMyBussines
}
