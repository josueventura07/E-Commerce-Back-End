const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const Roles = db.define('roles' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNullL: false,
        validate: {
            len: [2, 50]
        }
    }
})

module.exports = Roles