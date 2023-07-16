const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Users = require('./users.models')
const Roles = require('./roles.models')
const BussinesInfos = require('./bussines_info.models')


const Profiles = db.define('profiles' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bussinesInfoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: BussinesInfos
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNullL: false,
        references: {
            key: 'id',
            model: Users
        }
    },
    roleId: {
        type: DataTypes.UUID,
        allowNullL: false,
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