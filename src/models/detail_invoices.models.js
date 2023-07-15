const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Invoices = require('./invoices.models')

const Detail_invoices = db.define('detail_invoices', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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

module.exports = Detail_invoices