const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Receptions = require('./receptions.models')

const Detail_receptions = db.define('detail_receptions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    receptionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Receptions
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

module.exports = Detail_receptions