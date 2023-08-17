const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Profiles = require('./profiles.models')

const UnitOfMeasures = db.define('unitOfMeasures' , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNullL: false,
        unique: true,
        validate: {
            len: [2, 50]
        }
    },
    profileId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Profiles
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = UnitOfMeasures