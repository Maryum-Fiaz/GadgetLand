// takes dummy data and fill database with it

import mongoose from "mongoose";
import { products } from './data.js';
import Product from "../models/product.js";

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/gadgetland");

        await Product.deleteMany();  // delete all the previous products
        console.log("Products are deleted");

        await Product.insertMany(products); // add all new dummy products from data.js into the database
        console.log("Products are added");

        process.exit();
    }
    catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();