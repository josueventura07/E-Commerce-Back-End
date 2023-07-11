const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const UnitOfMeasures = require('./unit_of_measures.models')
const Categories = require('./categories.models')


const Products = db.define('products' , {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNullL: false,
        validate: {
            len: [2, 100]
        }
    },
    umId: {
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
    
})

module.exports = Products