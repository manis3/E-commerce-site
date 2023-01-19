

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
///////////////////////Get all the products => api/v1/products ////
exports.getProducts = AsyncErrorHandler(async (req, res, next) => {

    const product = await Product.find();

    res.status(200).json({
        success: true,
        count: product.length,
        product,
        Message: "Product Fetched successfully",

    })

})

//////////////////////Get sinigle product Details => api/v1/products////
exports.getSingleProducts = AsyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return (
            res.status(404).json({
                success: false,
                message: "Product not found",
            })
        )
    }

    res.status(200).json({
        success: true,
        message: "Product successfully Fetched",
        product,
    })
})

///////////////////////update product using id => api/v1/update Product

exports.updateProducts = AsyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return (
            res.status(404).json({
                success: false,
                message: 'Product not found',
            })
        )
    }
    ////////////////////////////here product is not defined or decleard because it has already been decleared/////////
    product = await Product.findByIdAndUpdate(req.params.id,
        res.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

    });

    res.status(200).json({
        success: true,
        message: "product updated successfully",
        product,
    });
});

