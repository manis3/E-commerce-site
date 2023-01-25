const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');


// select=false //////////////// means when ever we are selecting the user we dont want to show the password of the user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter your name"],
        maxLength: [50, "your name must not exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "please Enter your emai"],
        unique: true,
        validate: [validator.isEmail, "please Enter valid email adress"]

    },
    password: {
        type: String,
        required: [true, "please Enter your password"],
        minLength: [8, "your password must not exceed 8"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }


    },
    role: {
        type: String,
        default: "user"

    },
    contactNo: {
        type: Number,
        required: true,

    },
    Address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

//////////////////////////////to encrypt the password using bcrypt package////////////////
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    ////////////////////////////////////////if condition checks if the password has been changed or not,if the pw has been changed then it first set the new data as password and then encrypt it.

    ////if not encrypt then the password doesnot have to encrypted
    ////used in update password
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}
///////////// generate jwt token////////////////////////////
userSchema.methods.getJwtToken = function () {
    return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,

    })
}


module.exports = mongoose.model('users', userSchema);