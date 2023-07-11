const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const UnitOfMeasures = db.define('unitOfMeasures' , {
    id: {
        type: DataTypes.INTEGER,
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

module.exports = UnitOfMeasures