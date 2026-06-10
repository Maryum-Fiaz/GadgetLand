import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import User from '../models/user.js';

// Register User =>  /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
  });

});