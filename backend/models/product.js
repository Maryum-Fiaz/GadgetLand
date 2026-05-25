// Resource : Product (Structure of Product)

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        maxLength: [200, 'Product name cannot exceed 200 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
        maxLength: [5, 'Product price cannot exceed 5 digits']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0         //no reviews by default
    },
    images: [
        {
            public_id: {
                type: String,
                required: false,          // make it true now
            },
            url: {
                type: String,
                required: false           //make it true now!!
            }
        }
    ],
    category: {
        type: String,
        required:[true, 'Please enter product category'],
        enum: {          //restricting user to select only from specified values only or get error message
            values: [
                "Laptops",
                "Smartphones",
                "Headphones",
                "Gaming Gear",
                "Wearables",
                "Accessories"
            ],
            message: 'Please select correct category', //error
        },
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock']
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, //TODO: it's true, temporarily false
        
    },

},
    {timestamps: true}
)

export default mongoose.model('Product', productSchema);
