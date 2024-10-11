import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cors from "cors";


import setupDB from './db/db-setup'
import credentials from './configs/constants.config';
import './auth/strategies/local'
import productsRoutes from './routes/products.route';
import accountRoutes from './routes/account.route';
import authRotes from './routes/auth.route';
import {errorHandler} from "./middleware/errorHandler.middleware";
import usersRoute from "./routes/admin/users.route";
import ordersRoute from "routes/admin/orders.route";
import productsRoute from "routes/admin/products.route";
setupDB()

const app = express()


app.use(cookieParser())

app.use(session({
    secret: credentials.sessionSecret!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: credentials.mongoUrl
    })
}))

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(passport.initialize())
app.use(passport.session())


app.use('/uploads', express.static(path.join(__dirname, './static/images')));
app.use('/api/auth', authRotes)
app.use('/api/products', productsRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/admin/users', usersRoute)
app.use('/api/admin/products', productsRoute)
app.use('/api/admin/orders', ordersRoute)

app.get('/', (req, res) => {
    res.send({'message': 'ok'})
})



app.use(errorHandler)

app.listen(credentials.port, () => {
    console.log(`listening of port: ${credentials.port}`)
})
