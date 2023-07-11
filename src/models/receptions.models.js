const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Profiles = require('./profiles.models')


const Receptions = db.define('receptions' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNullL: false
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        references: {
            key: 'id',
            model: Profiles
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        references: {
            key: 'id',
            model: Products
        }
    },
    cost: {
        type: DataTypes.DOUBLE,
        allowNullL: false 
    },
    quantity: {
        type: DataTypes.DOUBLE,
        allowNullL: false
    },
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
        }
    },
    
})

module.exports = Receptions