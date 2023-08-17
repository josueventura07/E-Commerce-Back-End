const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')
const Products = require('./products.models')

const Receivings = db.define('receivings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: Products
        }
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Receivings