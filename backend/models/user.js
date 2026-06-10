// Resource : User (Structure of User)

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

    // All Fields
    name: {
        type : String,
        required : [true, 'Please enter your name'],
        maxLength: [50, "Your name cannot exceed 50 characters"]
    },
    email: {
        type : String,
        required : [true, 'Please enter your email'],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,  // Regex Pattern for valid email
        'Please enter a valid email address'
        ],
    },
    password: {
        type : String,
        required : [true, 'Please enter your password'],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false,   //don't send password in the response (to the user ❌)
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type : String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
  {timestamps: true}
);

// Encrypting password before saving the user
userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);