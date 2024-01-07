require('dotenv').config();


module.exports = {
    port : process.env.PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PSW,
    session_secret : process.env.S_SECRET,
    mongo_url : process.env.MONGO_URL



}