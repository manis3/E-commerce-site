const express = require('express');
const router = express.Router();

const { newProducts,
    getProducts } = require('../controllers/ProductController');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProducts);

module.exports = router;


