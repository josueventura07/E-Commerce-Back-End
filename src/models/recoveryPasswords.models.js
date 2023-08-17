const { DataTypes } = require('sequelize')
const Users = require('./users.models')
const db = require('../utils/database')

const RecoveryPasswords = db.define('recovery_passwords', {
    id: {
        type: DataTypes.UUID,
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
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = RecoveryPasswords