require('dotenv').config();


module.exports = {
    port : process.env.PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PSW



}