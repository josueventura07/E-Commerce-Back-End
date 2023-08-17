const receptionsControllers = require('./receptions.controllers')
const detail_receptionsControllers = require('../detail_receptions/detail_receptions.controllers')
const profilesController = require('../profiles/profiles.controllers')
const receivingProductsControllers = require('../receivings/receivings.controllers')

const getAllReceptions = (req, res) => {
    receptionsControllers.findAllReceptions()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getAllMyReceptions = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesController.findProfileIdByUserId(userId)     
    receptionsControllers.findAllMyReceptions(profileId)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postReception = async (req, res) => {
    const userId = req.user.id
    const profileId = await profilesController.findProfileIdByUserId(userId)
    const {supplierName, invoiceNumber} = req.body
    const receivingProducts = await receivingProductsControllers.findAllMyReceivings(profileId)
    const detailProducts = receivingProducts
    let amount = 0
    receivingProducts.forEach(element => {
        if(element.cost) {
            amount = amount + element.dataValues.cost * element.dataValues.quantity
        }      
    });
        
        receptionsControllers.createReception({supplierName, invoiceNumber, profileId, amount})

        .then((data) => {
            const receptionId = data.id
            detailProducts.forEach( element => {
            if(!element.supplierName && !element.invoiceNumber) {
                const productId = element.dataValues.productId
                const cost = element.dataValues.cost
                const quantity = element.dataValues.quantity
                detail_receptionsControllers.createProductReception({receptionId, productId, cost, quantity})
            }
        });
            receivingProductsControllers.cleanReceivings()
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    
    
    
}

module.exports = {
    getAllReceptions,
    getAllMyReceptions,
    postReception
}