import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user.model'
import Admin from "../../models/admin.model";
import {AuthenticatedUser} from "../../types/AuthenticatedUser";

passport.use('user-local', new LocalStrategy({usernameField : 'email'},
    async (email: string, password: string, done) => {
        try {
            const user = await User.query().findOne({ email });
            if (!user || !(await user.verifyPassword(password))) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.use('admin-local', new LocalStrategy({usernameField : 'email'},
    async (email: string, password: string, done) => {
        try {
            const admin = await Admin.query().findOne({ email });
            if (!admin || !(await admin.verifyPassword(password))) {
                return done(null, false, { message: 'Invalid username or password' });
            }
            return done(null, admin);
        } catch (err) {
            return done(err);
        }
    }
));
//fuck this shit, idk how to set not any type here
passport.serializeUser((user: any, done) => {
    done(null, { id: user.id, type: user instanceof Admin ? 'admin' : 'user' });
});

passport.deserializeUser(async (user: { id: number, type: 'user' | 'admin' }, done) => {
    if(user.type === 'admin'){
        try {
            const userData = await Admin.query().findById(user.id);
            done(null, userData);
        } catch (err) {
            done(err);
        }
    }else if(user.type === 'user'){
        try {
            const userData = await User.query().findById(user.id);
            done(null, userData);
        } catch (err) {
            done(err);
        }
    }
});






// import {comparePassword} from '../../utils/authHelper.util'

// passport.serializeUser((user, done)=> {
//     done(null, user.id)
// })
//
// passport.deserializeUser(async (id : number, done)=>{
//     try{
//         const user = await User.query().findById(id)
//         if(!user){
//             throw new Error('User not found')
//         }
//         done(null, user)
//     }catch(err){
//         done(err, null)
//     }
// })
//
// passport.use(
//     new Strategy({
//         usernameField : 'email',
//     }, async (email, password, done)=>{
//
//
//         if(!email || !password){
//             return done(null, false, { message: 'Missing Credentials'})
//         }
//         const user = await User.query().findOne('email', '=', email).select('id', 'first_name', 'email', 'password')
//         if(!user){
//             return done(null, false, { message: 'User not found'})
//         }
//         const isValid = comparePassword(password, user.password)
//         if(isValid){
//             done(null, user)
//         }else{
//             return done(null, false, { message: 'Incorrect password.'});
//         }
//
//
//     })
// )