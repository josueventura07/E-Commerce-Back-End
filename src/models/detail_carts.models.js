const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Carts = require('./carts.models')

const Detail_carts = db.define('detail_carts', {
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = Detail_carts