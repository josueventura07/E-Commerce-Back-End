const sequelize = require('sequelize')

const Products = require('../models/products.models')
const UnitOfMeasures = require('../models/unit_of_measures.models')
const Categories = require('../models/categories.models')
const productImgs = require('../models/images_catalog.models')
const Detail_receptions = require('../models/detail_receptions.models')
const Detail_orders = require('../models/detail_orders.models')
const ImgsCatalog = require('../models/images_catalog.models')


const findAllProducts = async () => {
    const data = await Products.findAll({
        where: {
            status: true
        },
        attributes: {
            exclude: ['unitOfMeasureId', 'categoryId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['id','name']
        }, {
            model: Categories,
            attributes: ['id', 'name']
        }, {
            model: productImgs,
            attributes: ['id', 'imgUrl']
        }]
    })

    return data
}

const findAllStocks = async () => {
    const data = await Products.sequelize.query(
        `select p.id, p."productName", p.description, p."categoryId", ic."imgUrl" as "imgsCatalogs", p.price, coalesce(dr.received) as received , coalesce(do2.ordered, 0) as ordered, coalesce(dr.received - do2.ordered, dr.received) as stock
        from products p
        left join (select "productId", sum(quantity) as received 
                        from detail_receptions 
                        inner join receptions r on "receptionId" = r.id group by "productId", r.status having r.status = true) dr 
                            on dr."productId" = p.id
        left join (select "productId", sum(quantity) as ordered 
                        from detail_orders 
                        inner join orders o on "orderId" = o.id  group by "productId", o.status having o.status = true) do2 
                            on do2."productId" = p.id
        left join (select "productId", json_agg(json_build_object('id', id, 'imgUrl', "imgUrl")) as "imgUrl"
        from "imgsCatalogs" group by "productId") ic on ic."productId" = p.id
        order by p."productName"`, 
        {type: sequelize.QueryTypes.SELECT})
          
    return data

}

const findProductById = async (id) => {

    const data = await Products.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['categoryId', 'unitOfMeasureId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['name']
        }, {
            model: Categories,
            attributes: ['name']
        }, {
            model: productImgs,
            attributes: ['id', 'imgUrl']
        }]
    })
    
    
    
    /*Products.sequelize.query(
        `select p.id, p."productName", p."description", ct.id as "categoryId", ct.name as "categoryName", ic."imgUrl" as "imgsCatalogs", p.price, sum(dr.quantity) as received, sum(do2.quantity) as ordered, sum(dr.quantity) - sum(do2.quantity) as stock
        from products p
        inner join "imgsCatalogs" ic on ic."productId" = p.id
        inner join "categories" ct on ct.id = p."categoryId"
        inner join detail_receptions dr on dr."productId" = p.id
        inner join detail_orders do2 on do2."productId" = p.id
        WHERE p.id = ${id}
        group by p.id, ic."imgUrl", ct.id, ct.name 
        order by p.id`, 
        {type: sequelize.QueryTypes.SELECT})

    */

    return data
}

const findAllProductsByCategory = async (category) => {

    const data = await Products.sequelize.query(
        `select p.id, p."productName", p.description, p."categoryId", ic."imgUrl" as "imgsCatalogs", p.price, coalesce(dr.received) as received , coalesce(do2.ordered, 0) as ordered, coalesce(dr.received - do2.ordered, dr.received) as stock
        from products p
        left join (select "productId", sum(quantity) as received 
                        from detail_receptions 
                        inner join receptions r on "receptionId" = r.id group by "productId", r.status having r.status = true) dr 
                            on dr."productId" = p.id
        left join (select "productId", sum(quantity) as ordered 
                        from detail_orders 
                        inner join orders o on "orderId" = o.id  group by "productId", o.status having o.status = true) do2 
                            on do2."productId" = p.id
        left join (select "productId", json_agg(json_build_object('id', id, 'imgUrl', "imgUrl")) as "imgUrl"
        from "imgsCatalogs" group by "productId") ic on ic."productId" = p.id
        where p."categoryId" = ${category}
        order by p."productName"`, 
        {type: sequelize.QueryTypes.SELECT})

   /* const data = await Products.findAll({
        where: {
            categoryId: category
        },
        attributes: {
            exclude: ['categoryId', 'unitOfMeasureId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: UnitOfMeasures,
            attributes: ['id','name']
        }, {
            model: Categories,
            attributes: ['id', 'name']
        }, {
            model: productImgs,
            attributes: ['imgUrl']
        }]
    })
*/
    return data
}

const findProductByName = async (productName) => {
    const data = await Products.findOne({
        where: {
            productName: productName
        }
    })

    return data.id
}

const createProduct = async (obj) => {
    const data = await Products.create({
        productName: obj.productName,
        description: obj.description,
        unitOfMeasureId: obj.unitOfMeasureId,
        categoryId: obj.categoryId,
        price: obj.price,
        comment: obj.comment,
        profileId: obj.profileId
    })

    return data
}

const updateProduct = async (id, obj) => {
    const data = await Products.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const delProduct = async (id, obj) => {
    const data = await Products.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

module.exports = {
    findAllProducts,
    findAllStocks,
    findProductById,
    findAllProductsByCategory,
    findProductByName,
    createProduct,
    updateProduct,
    delProduct
}