const receptionsControllers = require('./receptions.controllers')
const detail_receptionsControllers = require('../detail_receptions/detail_receptions.controllers')
const profilesController = require('../profiles/profiles.controllers')

const getAllReceptions = (req, res) => {
    receptionsControllers.findAllReceptions()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const postReception = async (req, res) => {
    const userId = req.user.id
    const receptionInfo = req.body
    const profileId = await profilesController.findProfileIdByUserId(userId)
        
        const supplierName = receptionInfo[0].supplierName
        const invoiceNumber = receptionInfo[0].invoiceNumber
        let amount = 0
    const detailProducts = receptionInfo
        receptionInfo.forEach(element => {
           if(element.cost) {
                amount = amount + element.cost * element.quantity
            }      
        });
        
        receptionsControllers.createReception({supplierName, invoiceNumber, profileId, amount})

        .then((data) => {
            const receptionId = data.id
            detailProducts.forEach( element => {
            if(!element.supplierName && !element.invoiceNumber) {
            
                const productId = element.productId
                const cost = element.cost
                const quantity = element.quantity
                detail_receptionsControllers.createProductReception({receptionId, productId, cost, quantity})
            }
        });
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
    
    
    
}

module.exports = {
    getAllReceptions,
    postReception
}