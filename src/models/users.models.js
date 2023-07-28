const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Bussines = require('./bussines.models')

const Users = db.define('users' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bussineId: {
        type: DataTypes.UUID,
        references: {
            key: 'id',
            model: Bussines
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Users