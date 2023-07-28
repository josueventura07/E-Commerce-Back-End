const {DataTypes} = require('sequelize')

const db = require('../utils/database')


const Bussines = db.define('bussines' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bussineName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Bussines