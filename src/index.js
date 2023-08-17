const express = require('express')
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products.route');

const config = require('./configs/constants.config');

const setupDB = require('./db/db-setup')
setupDB()





const app = express()

app.use(express.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);


app.get('/', (req, res)=>{
    res.send({'message': 'ok'})
})

app.use('/api/products', productsRoutes)


app.listen(config.port, ()=>{
    console.log(`listening of port: ${config.port}`)
})
