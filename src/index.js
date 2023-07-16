const express = require('express');
const cors = require('cors');

const config = require('../config');
const db = require('./utils/database');
const initModels = require('./models/initModels');
const userRouter = require('./users/users.router');
const profileRouter = require('./profiles/profiles.router')
const bussineRouter = require('./bussinesInfo/bussinesInfo.router');
const roleRouter = require('./roles/roles.router');
const authRouter = require('./auth/auth.router');
const unitOfMeasuresRouter = require('./unitOfMeasure/unitOfMeasures.router')
const categoriesRouter = require('./categories/categories.router')
const productsRouter = require('./products/products.router')

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

app.use('/api/v1/bussines', bussineRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/profiles', profileRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/unitOfMeasures', unitOfMeasuresRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/products', productsRouter);


app.listen(config.api.port, () => {
    console.log(`Server started at port: ${config.api.host}`)
});