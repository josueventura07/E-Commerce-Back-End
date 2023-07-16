const {DataTypes} = require('sequelize')

const db = require('../utils/database')

const Categories = db.define('categories' , {
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
    }
})

module.exports = Categories