// Create token and save in the cookie
export default (user, statusCode, res) => {
  // Create JWT Token
  const token = user.getJwtToken(); //user.js in models defined getJwtToken function

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION",
    sameSite: "none",
  };
  // cookie function ("cookie name", value, options)
  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
