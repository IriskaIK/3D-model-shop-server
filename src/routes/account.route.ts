import express, { Router, Request, Response } from 'express';
import isAuthenticated from "../middleware/isAuthenticated.middleware";
import {
    getDeliveryDetails,
    getUserAccountDetails,
    updateAccountDetails,
    updateDeliveryDetails
} from "../controllers/account.contoller";
import {validateAccountDetails} from "../utils/validators/accountDetailsValidator.util";
import {validateDeliveryDetails} from "../utils/validators/deliveryDetailsValidator.util";
import {
    addProductToCart,
    getProductsInCart,
    getQuantityOfProductInCart,
    removeProductFromCart, updateProductInCart
} from "../controllers/cart.controller";
import {
    addProductToWishList,
    getProductsInWishlist,
    removeProductFromWishlist
} from "../controllers/wishlist.controller";
import {createOrder, getOrders} from "../controllers/orders.controller";

const router: Router = express.Router();

router.use(isAuthenticated)

router.get('/', getUserAccountDetails)
router.put('/', validateAccountDetails, updateAccountDetails)

router.get('/delivery', getDeliveryDetails)
router.put('/delivery', validateDeliveryDetails,updateDeliveryDetails)


router.get('/cart/add/:id', addProductToCart)
// TODO: add body validation
router.put('/cart', updateProductInCart)
router.get('/cart/:id', getQuantityOfProductInCart)
router.get('/cart', getProductsInCart)
router.delete('/cart/:id', removeProductFromCart)

router.get('/wishlist/:id', addProductToWishList)
router.get('/wishlist', getProductsInWishlist)
router.delete('/wishlist/:id', removeProductFromWishlist)

// TODO: add body validation
router.post('/orders', createOrder)
router.get('/orders', getOrders)

export default router;
