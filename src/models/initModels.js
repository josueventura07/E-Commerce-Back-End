const Categories = require('./categories.models')
const ImgsCatalog = require('./images_catalog.models')
const Products = require('./products.models')
const Profiles = require('./profiles.models')
const Orders = require('./orders.models')
const Receptions = require('./receptions.models')
const Roles = require('./roles.models')
const UnitOfMeasures = require('./unit_of_measures.models')
const Users = require('./users.models')
const Carts = require('./carts.models')
const Detail_orders = require('./detail_orders.models')
const Detail_receptions = require('./detail_receptions.models')
const Bussines = require('./bussines.models')
const Receivings = require('./receivings.models')

const initModels = () => {
    
    Users.belongsTo(Bussines)
    Bussines.hasMany(Users)

    Profiles.belongsTo(Users)
    Users.hasMany(Profiles)

    Profiles.belongsTo(Roles)
    Roles.hasMany(Profiles)

    Products.belongsTo(Categories)
    Categories.hasMany(Products)

    Categories.belongsTo(Profiles)
    Profiles.hasMany(Categories)

    ImgsCatalog.belongsTo(Products)
    Products.hasMany(ImgsCatalog)

    ImgsCatalog.belongsTo(Profiles)
    Profiles.hasMany(ImgsCatalog)

    Products.belongsTo(Profiles)
    Profiles.hasMany(Products)

    Products.belongsTo(UnitOfMeasures)
    UnitOfMeasures.hasMany(Products)

    UnitOfMeasures.belongsTo(Profiles)
    Profiles.hasMany(UnitOfMeasures)

    Receptions.belongsTo(Profiles)
    Profiles.hasMany(Receptions)

    Orders.belongsTo(Profiles)
    Profiles.hasMany(Orders)

    Receptions.belongsToMany(Products, {through: 'detail_receptions'})
    Products.belongsToMany(Receptions, {through: 'detail_receptions'})

    Detail_receptions.belongsTo(Receptions)
    Receptions.hasMany(Detail_receptions)

    Detail_receptions.belongsTo(Products)
    Products.hasMany(Detail_receptions)

    Orders.belongsToMany(Products, {through: 'detail_orders'})
    Products.belongsToMany(Orders, {through: 'detail_orders'})

    Detail_orders.belongsTo(Orders)
    Orders.hasMany(Detail_orders)

    Detail_orders.belongsTo(Products)
    Products.hasMany(Detail_orders)

    Profiles.belongsToMany(Products, {through: 'carts'})
    Products.belongsToMany(Profiles, {through: 'carts'})

    Carts.belongsTo(Products)
    Products.hasMany(Carts)

    Carts.belongsTo(Profiles)
    Profiles.hasMany(Carts)

    Users.belongsTo(Bussines)
    Bussines.hasMany(Users)

    Profiles.belongsToMany(Products, {through: 'receivings'})
    Products.belongsToMany(Profiles, {through: 'receivings'})

    Receivings.belongsTo(Products)

    
}

module.exports = initModels