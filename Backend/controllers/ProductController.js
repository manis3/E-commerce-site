

const Product = require('../models/product'); 
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandlers');
const APIFeatures = require('../utils/apiFeatures');


///////////////////////////////Creating new Product => api/v1/products///////////
exports.newProducts = catchAsyncErrors(async (req, res, next) => {
    // req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    })
})
///////////////////////Get all the products => api/v1/products ////
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(), req.query).search();
    const product = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: product.length,
        product,
        Message: "Product Fetched successfully",

    })

})

//////////////////////Get sinigle product Details => api/v1/products////
exports.getSingleProducts = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return (
            next(new ErrorHandler('Product not found'), 404)
        )
    }

    res.status(200).json({
        success: true,
        message: "Product successfully Fetched",
        product,
    })
})

///////////////////////update product using id => api/v1/update Product

exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return (
            next(new ErrorHandler('Product not found', 404))
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



/////////////////////////Delete Product => api/v1/product///////////////


exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return (
            next(new ErrorHandler('Product not found', 404))

        )
    }
    product = await product.remove();
    res.status(200).json({
        success: true,
        message: "Product removed successfully",
        product,
    })
})



