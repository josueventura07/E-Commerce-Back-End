const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')


const Carts = db.define('carts' , {
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
    }
})

module.exports = Carts