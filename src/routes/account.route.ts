import express, { Router, Request, Response } from 'express';
import isAuthenticated from "../middleware/isAuthenticated.middleware";
import {
    getDeliveryDetails,
    getUserAccountDetails,
    updateAccountDetails,
    updateDeliveryDetails
} from "@/controllers/account.contoller";
import {validateAccountDetails} from "@/utils/validators/accountDetailsValidator.util";
import {validateDeliveryDetails} from "@/utils/validators/deliveryDetailsValidator.util";
import {
    addProductToCart,
    getProductsInCart,
    removeProductFromCart, updateCartProductSelection, updateProductInCart
} from "@/controllers/cart.controller";
import {
    addProductToWishList,
    getProductsInWishlist,
    removeProductFromWishlist
} from "@/controllers/wishlist.controller";
import {createOrder, getOrders} from "@/controllers/orders.controller";
import {validateProductQuantity} from "@/utils/validators/productQuantityValidator.util";
import {validateOrder} from "@/utils/validators/orderValidator.util";

const router: Router = express.Router();

router.use(isAuthenticated('user'))

router.get('/', getUserAccountDetails)
router.put('/', validateAccountDetails, updateAccountDetails)

router.get('/delivery', getDeliveryDetails)
router.put('/delivery', validateDeliveryDetails, updateDeliveryDetails)


router.get('/cart', getProductsInCart)
router.get('/cart/add/:id', addProductToCart)
router.put('/cart', validateProductQuantity, updateProductInCart)
router.put('/cart/selection', updateCartProductSelection)
router.delete('/cart/:id', removeProductFromCart)
//
router.get('/wishlist', getProductsInWishlist)
router.get('/wishlist/:id', addProductToWishList)
router.delete('/wishlist/:id', removeProductFromWishlist)
//
router.post('/orders', validateOrder,createOrder)
router.get('/orders', getOrders)

export default router;
