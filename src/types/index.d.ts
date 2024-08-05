import {User as MyUser} from '../../models/user.model'
import passport from 'passport'

declare global {
    namespace Express {
        interface User extends MyUser {
            id : number,
            type : string
        }
    }
}
