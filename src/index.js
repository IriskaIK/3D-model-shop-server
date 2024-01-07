const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const cors = require("cors");
require('./auth/strategies/local')

const productsRoutes = require('./routes/products.route');
const accountRoutes = require('./routes/account.route')
const authRotes = require('./routes/auth.route')

const config = require('./configs/constants.config');
const setupDB = require('./db/db-setup')
setupDB()





const app = express()


app.use(cookieParser())
app.use(session({
    secret: config.session_secret,
    resave : false,
    saveUninitialized : false,
    store: MongoStore.create({
        mongoUrl:config.mongo_url
    })
}))
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

app.use(bodyParser.json())


const corsOptions = {
    origin: "http://localhost:5173",
    credentials : true
};
  
app.use(cors(corsOptions));


app.use(passport.initialize())
app.use(passport.session())


app.use('/uploads', express.static(path.join(__dirname, './static/images')));
app.use('/api/auth', authRotes)
app.use('/api/products', productsRoutes)
app.use('/api/account', accountRoutes)



app.get('/', (req, res)=>{
    res.send({'message': 'ok'})
})


app.listen(config.port, ()=>{
    console.log(`listening of port: ${config.port}`)
})
