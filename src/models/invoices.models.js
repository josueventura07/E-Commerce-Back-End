const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')


const Invoices = db.define('invoices' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Profiles
        }
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
})

module.exports = Invoices