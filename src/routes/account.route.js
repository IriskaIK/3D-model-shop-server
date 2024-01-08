const express = require('express'); 
const router = express.Router();
const accountController = require('../controllers/account.controller');
const cartController = require('../controllers/cart.controller')
const wishlistController = require('../controllers/wishlist.controller')
const ordersController = require('../controllers/orders.controller')
const { isAuthenticated } = require('../middleware/isAuthenticated.middleware');



router.use(isAuthenticated)

router.get('/', accountController.getUserAccountDetails)
router.post('/', accountController.updateAccountDetails)

// router.get('/delivery', accountController.getDeliveryDetails)

router.post('/delivery', accountController.updateDeliveryDetails)

router.post('/cart', cartController.addProductToCart)
router.put('/cart', cartController.updateProductInCart)
router.get('/cart', cartController.getProductsInCart)
router.get('/cart/:id', cartController.getQuantityOfProductInCart)
router.delete('/cart', cartController.removerProductFromCart)

router.post('/wishlist', wishlistController.addProductToWishlist)
router.get('/wishlist', wishlistController.getProductsInWishlist)
router.delete('/wishlist', wishlistController.removerProductFromWishlist)


router.post('/orders', ordersController.createOrder)
router.get('/orders', ordersController.getOrders)



module.exports = router;