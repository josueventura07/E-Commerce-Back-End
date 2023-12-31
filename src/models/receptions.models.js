const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')


const Receptions = db.define('receptions' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    supplierName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNullL: false
    },
    profileId: {
        type: DataTypes.UUID,
        allowNullL: false,
        references: {
            key: 'id',
            model: Profiles
        }
    },
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
        }
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNullL: false 
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Receptions