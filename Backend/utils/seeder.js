////////////This file is used to seed the dummy data into the database/////////
const Product = require('../models/product');
const dotenv = require('dotenv');

const connectDB = require('../config/db');

const products = require('../data/products')

///////////////////setting dotenv files/////////////
dotenv.config({ path: "Backend/config/config.env" });

connectDB();

///////////////////////seeding the dummy data to the database (adding or deleting the dummy data to the database//////////////
const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log("Products are deleted successfully");

        await Product.insertMany(products);
        console.log("Products are inserted successfully");

        process.exit();



    }
    catch (error) {
        console.log(error.message);
        process.exit();

    }
};

/////////////////////calling the seedProducts function///////////

seedProducts();
