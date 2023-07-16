const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const BussinesInfos = db.define('bussinesInfos' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = BussinesInfos