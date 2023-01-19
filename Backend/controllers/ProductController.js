

const Product = require('../models/product'); 
const AsyncErrorHandler = require('../middleware/AsyncErrorHandler');


///////////////////////////////Creating new Product => api/v1/products///////////
exports.newProducts = AsyncErrorHandler(async (req, res, next) => {
    // req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    })
}
)
///
exports.getProducts = AsyncErrorHandler(async (req, res, next) => {

    const product = await Product.find();

    res.status(201).json({
        success: true,
        count: product.length,
        product,
        Message: "Product Fetched successfully",

    })

})