const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')


const Orders = db.define('orders' , {
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
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
        }
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
})

module.exports = Orders