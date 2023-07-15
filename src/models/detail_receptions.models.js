const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Receptions = require('./receptions.models')

const Detail_receptions = db.define('detail_receptions', {
    cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }

})

module.exports = Detail_receptions