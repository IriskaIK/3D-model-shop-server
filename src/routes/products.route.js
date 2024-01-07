const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');


router.post('/', productsController.getProducts);

router.post('/product/:id', productsController.getProductByID)

router.get('/tags', productsController.getTags)

router.get('/universes', productsController.getUniverses)


module.exports = router;