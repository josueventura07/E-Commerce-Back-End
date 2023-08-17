/*const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')
const Bussines = require('./bussines.models')


const BussinessAdministrators = db.define('bussinesAdministrators', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    },
    bussineId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Bussines
        }
    }
})

module.exports = BussinessAdministrators*/