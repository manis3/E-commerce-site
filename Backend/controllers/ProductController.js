

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

exports.getProducts = async (req, res, next) => {
    try {


        res.status(200).json({
            success: true,
            message: 'This route will show all the data of database'

        })
    }
    catch { (err) => { console.log(err) } };
}