import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import Order from "../models/order.js";

// Create new Order  =>  /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => { // ** IMPORTANT: This only create order when 'COD' -> Cash on Delivery
  const {
    orderItems,
    shippingInfo,   
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});