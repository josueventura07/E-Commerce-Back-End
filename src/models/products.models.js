const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const UnitOfMeasures = require('./unit_of_measures.models')
const Categories = require('./categories.models')
const Profiles = require('./profiles.models')

const Products = db.define('products' , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
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
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    comment: {
        type: DataTypes.STRING,
        validate: {
            len: [2, 150]
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

module.exports = Products