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
const BussinesAdministrators = require('./BussinesAdministrators.models')
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

    ImgsCatalog.belongsTo(Products)
    Products.hasMany(ImgsCatalog)

    Products.belongsTo(UnitOfMeasures)
    UnitOfMeasures.hasMany(Products)

    Receptions.belongsTo(Profiles)
    Profiles.hasMany(Receptions)

    Orders.belongsTo(Profiles)
    Profiles.hasMany(Orders)

    Receptions.belongsToMany(Products, {through: 'detail_receptions'})
    Products.belongsToMany(Receptions, {through: 'detail_receptions'})

    Orders.belongsToMany(Products, {through: 'detail_orders'})
    Products.belongsToMany(Orders, {through: 'detail_orders'})

    Profiles.belongsToMany(Products, {through: 'carts'})
    Products.belongsToMany(Profiles, {through: 'carts'})

    Carts.belongsTo(Products)
    Products.hasMany(Carts)

    Users.belongsToMany(Bussines, {through: 'bussinesAdministrators'})
    Bussines.belongsToMany(Users, {through: 'bussinesAdministrators'})

    Profiles.belongsToMany(Products, {through: 'receivings'})
    Products.belongsToMany(Profiles, {through: 'receivings'})

    //BussinesAdministrators.belongsTo(Roles)
    //Roles.hasMany(BussinesAdministrators)

    BussinesAdministrators.belongsTo(Users)
    Users.hasMany(BussinesAdministrators)

    BussinesAdministrators.belongsTo(Bussines)
    Bussines.hasMany(BussinesAdministrators)

}

module.exports = initModels