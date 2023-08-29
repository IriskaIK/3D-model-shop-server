const ShippingAddress = require("../models/shippingAddress.model");
const User = require("../models/user.model"); 
const validateAccountDetails = require("../utils/validators/accountDetailsValidator");
const validateDelivery = require("../utils/validators/deliveryValidator");

module.exports = {

    getUserAccountDetails : async (req, res) => {
        const user = await User.query()
            .findById(req.user.id)
            .select('email', 'first_name', 'last_name', 'phone')
            .withGraphFetched('avatar(avatarSelectOptions)')
            .withGraphFetched('shipping_address(addressSelectOptions)')
            .modifiers(
                {
                    avatarSelectOptions(builder) {
                        builder.select('filename', 'path');
                    },
                    addressSelectOptions(builder) {
                        builder.select('region', 'city', 'postOffice');
                    },
                    
                }
                
                
            )
        if(user)res.send(user)
        else{
            res.redirect('/api/auth/login')
        }

    },
    updateAccountDetails : async (req, res)=>{
        const user_id = req.user.id
        const {first_name, last_name, phone, email} = req.body
        const valid = validateAccountDetails({
            first_name,
            last_name, 
            phone,
            email
        })
        if(valid.status){
            await User.query().patch(valid.values)
            const user = await User.query()
            .findById(user_id)
            .select('email', 'first_name', 'last_name', 'phone')
            .withGraphFetched('avatar(avatarSelectOptions)')
            .withGraphFetched('shipping_address(addressSelectOptions)')
            .modifiers(
                {
                    avatarSelectOptions(builder) {
                        builder.select('filename', 'path');
                    },
                    addressSelectOptions(builder) {
                        builder.select('region', 'city', 'postOffice');
                    },
                    
                }    
            )
            res.status(200)
            res.send({user})
        }else{
            res.status(400)
            res.send({msg : 'Invalid inputs'})
        }

    },

    // getDeliveryDetails : async (req,res)=>{

    // },
    updateDeliveryDetails : async (req,res)=>{

        const addressData = validateDelivery(req.body.address)

        if(!addressData.status){
            res.status(400)
            res.send({msg : 'Invalid inputs'})
            return
        }
        const user = await User.query().findById(req.user.id)

        let shippingAddress = await ShippingAddress.query()
            .findById(user.shippingAddress_id)

        await shippingAddress.$query().patchAndFetch(addressData.values)

        delete shippingAddress.id
        res.send(shippingAddress)

        
    }
}