import {config} from "dotenv";
import * as process from "node:process";
config()

interface Credentials {
    port: string | undefined;
    database: string | undefined;
    user: string | undefined;
    password: string | undefined;
    sessionSecret: string | undefined;
    mongoUrl: string | undefined;
    host: string | undefined;
}

const credentials : Credentials  = {
    port : process.env.PORT,
    database : process.env.DB_NAME,
    user : process.env.DB_USER,
    password : process.env.DB_PSW,
    sessionSecret : process.env.S_SECRET,
    mongoUrl : process.env.MONGO_URL,
    host : process.env.DB_HOST

}
export default credentials;