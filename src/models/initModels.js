const Categories = require('./categories.models')
const ImgsCatalog = require('./images_catalog.models')
const Products = require('./products.models')
const Profiles = require('./profiles.models')
const Invoices = require('./invoices.models')
const Receptions = require('./receptions.models')
const Roles = require('./roles.models')
const UnitOfMeasures = require('./unit_of_measures.models')
const Users = require('./users.models')
const Carts = require('./carts.models')
const Detail_invoices = require('./detail_invoices.models')
const Detail_receptions = require('./detail_receptions.models')
const Detail_carts = require('./detail_carts.models')
const BussinesInfos = require('./bussines_info.models')

const initModels = () => {
    
    Profiles.belongsTo(Users)
    Users.hasMany(Profiles)

    Profiles.belongsTo(Roles)
    Roles.hasMany(Profiles)

    Profiles.belongsTo(BussinesInfos)
    BussinesInfos.hasMany(Profiles)
    
    Products.belongsTo(Categories)
    Categories.hasMany(Products)

    ImgsCatalog.belongsTo(Products)
    Products.hasMany(ImgsCatalog)

    Products.belongsTo(UnitOfMeasures)
    UnitOfMeasures.hasMany(Products)

    Receptions.belongsTo(Profiles)
    Profiles.hasMany(Receptions)

    Invoices.belongsTo(Profiles)
    Profiles.hasMany(Invoices)

    Carts.belongsTo(Profiles)
    Profiles.hasOne(Carts)

    Receptions.belongsToMany(Products, {through: 'detail_receptions'})
    Products.belongsToMany(Receptions, {through: 'detail_receptions'})

    Invoices.belongsToMany(Products, {through: 'detail_invoices'})
    Products.belongsToMany(Invoices, {through: 'detail_invoices'})

    Carts.belongsToMany(Products, {through: 'detail_carts'})
    Products.belongsToMany(Carts, {through: 'detail_carts'})

}

module.exports = initModels