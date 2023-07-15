const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const UnitOfMeasures = require('./unit_of_measures.models')
const Categories = require('./categories.models')


const Products = db.define('products' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNullL: false,
        validate: {
            len: [2, 100]
        }
    },
    unitOfMeasureId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        references: {
            key: 'id',
            model: UnitOfMeasures
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        references: {
            key: 'id',
            model: Categories
        }
    },
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Products