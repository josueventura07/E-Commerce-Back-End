const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Orders = require('./orders.models')

const Detail_orders = db.define('detail_orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Orders
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
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = Detail_orders