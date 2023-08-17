const express = require('express');
const cors = require('cors');

const config = require('../config');
const db = require('./utils/database');
const initModels = require('./models/initModels');

const userRouter = require('./users/users.router');
const roleRouter = require('./roles/roles.router');
const profileRouter = require('./profiles/profiles.router')
const loginRouter = require('./auth/auth.router')
const bussineRouter = require('./bussines/bussines.router');
const productsRouter = require('./products/products.router')
const unitOfMeasureRouter = require('./unitOfMeasure/unitOfMeasures.router')
const categoriesRouter = require('./categories/categories.router')
const imgsCatalogRouter = require('./imagesCatalog/imgsCatalog.router')
const receivingsRouter = require('./receivings/receivings.router')
const receptionsRouter = require('./receptions/receptions.router')
const cartsRouter = require('./carts/carts.router')
const ordersRouter = require('./orders/orders.router')

const app = express();

app.use(express.json());

app.use(cors());

db.authenticate()
.then(()=> console.log('Database Authenticaded'))
.catch(err => console.log(err));

db.sync()
.then(()=> console.log('Database Synced'))
.catch(err => console.log(err));

initModels();

app.get('/', (req, res)=> {
    res.status(200).json({
        status: 200,
        message: 'Ok!',
        routes: ""
    })
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/bussines', bussineRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/imgsCatalog', imgsCatalogRouter);
app.use('/api/v1/unitOfMeasure', unitOfMeasureRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/receivings', receivingsRouter);
app.use('/api/v1/receptions', receptionsRouter);
app.use('/api/v1/carts', cartsRouter);
app.use('/api/v1/purchases', ordersRouter);


app.listen(config.api.port, () => {
    console.log(`Server started at port: ${config.api.host}`)
});