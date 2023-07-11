const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')

const Profiles = db.define('profiles' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNullL: false,
        references: {
            key: 'id',
            model: Users
        }
    }
})

module.exports = Profiles