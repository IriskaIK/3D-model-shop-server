import passport from 'passport'
import {Strategy} from 'passport-local'
import User from '../../models/user.model'
import {comparePassword} from '../../utils/authHelper.util'

passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser(async (id : number, done)=>{
    try{
        const user = await User.query().findById(id)
        if(!user){
            throw new Error('User not found')
        }
        done(null, user)
    }catch(err){
        done(err, null)
    }
})

passport.use(
    new Strategy({
        usernameField : 'email',
    }, async (email, password, done)=>{


        if(!email || !password){
            return done(null, false, { message: 'Missing Credentials'})
        }
        const user = await User.query().findOne('email', '=', email).select('id', 'first_name', 'email', 'password')
        if(!user){
            return done(null, false, { message: 'User not found'})
        }
        const isValid = comparePassword(password, user.password)
        if(isValid){
            done(null, user)
        }else{
            return done(null, false, { message: 'Incorrect password.'});
        }


    })
)