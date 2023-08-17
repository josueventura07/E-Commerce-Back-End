const {DataTypes} = require('sequelize')

const db = require('../utils/database')
const Products = require('./products.models')
const Profiles = require('./profiles.models')

const ImgsCatalog = db.define('imgsCatalog' , {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNullL: false,
        references: {
            key: 'id',
            model: Products
        }
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNullL: false,
        validate: {
            isUrl: true
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

module.exports = ImgsCatalog