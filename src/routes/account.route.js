const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const { isAuthenticated } = require('../middleware/isAuthenticated.middleware');



router.use(isAuthenticated)

router.get('/', accountController.getUserAccountDetails)
router.post('/', accountController.updateAccountDetails)

// router.get('/delivery', accountController.getDeliveryDetails)

router.post('/delivery', accountController.updateDeliveryDetails)

module.exports = router;