const User = require('../models/user');
const ErrorHandlers = require('../utils/errorHandlers');
const catchAsyncError = require('../middleware/catchAsyncError');
// const user = require('../models/user');




//////////////Register user => /api/v1/register/////////////////


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:
                "avatars/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image_pn5wd9",
            url: "https://res.cloudinary.com/dmj2toixf/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1668152540/avatars/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image_pn5wd9.png",
        },
    });
    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        message: "user Created successfully",
        token,
        user
    })
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandlers("Please Enter Email and Password", 400));
    }

    //////////////finding user in database///////////
    const user = await User.findOne({ email }).select("+password")
    ///////////////////////here select method is used because in userSchema we have use Select = false due to which we cant select the pasword directly.
    console.log(user);
    if (!user) {
        return next(new ErrorHandlers("invalid Email and Password", 401))
    }

    ////////////////////check if the password is matched or not*//////////////

    const isPasswordMatched = await user.comparePassword(password); /////////////////here this line basically calls the method in model/user => user.comparePassword  with argument (password) => password stored in db
    // In model/user => user.comparePassword it catch the enterd password and pw stored in db compared two password using bcrypt.compare method and return the result to controller/user.

    if (!isPasswordMatched) {
        return next(new ErrorHandlers("Incorrect email and  Password", 401)
        )
    }
    const token = user.getJwtToken();//////////////storing user token to the variable/////
    res.status(201).json({
        sucess: true,
        token,
        user,
        message: "You are successfully Logged in",

    })
})