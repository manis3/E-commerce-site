const express = require('express');
const router = express.Router();

const {
    newProducts,
    getProducts,
    getSingleProducts,
    updateProducts,
    deleteProduct,
} = require('../controllers/ProductController');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProducts);
router.route('/admin/product/new').post(newProducts);
router.route('/admin/product/:id').put(updateProducts);
router.route('/admin/product/:id').delete(deleteProduct);

module.exports = router;


