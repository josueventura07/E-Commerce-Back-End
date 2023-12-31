const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')
const Roles = require('./roles.models')


const Profiles = db.define('profiles' , {
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
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Roles
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Profiles