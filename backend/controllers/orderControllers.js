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

// Get current user orders  =>  /api/v1/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

// Get Order by Id =>  /api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email" // only these fields
  );

  if (!order) {
    return next(
      new ErrorHandler(`NO Order found with Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    order,
  });
});

const getSalesData = async(startDate, endDate) => {
    const salesData = await Order.aggregate([
      {
        // Stage 1 - Filter results
        $match: {
          createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate), // between start and end dates
        },
        }
      },
      {
        // Stage 2 - Group Data
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          },
          totalSales : { $sum: '$totalAmount' },
          numOfOrders : { $sum: 1 },  // count the number of orders for each date
        }
      }
    ])
    
    // Create a Map to store sales data and num of order by data
    const salesMap = new Map()
    let totalSales = 0;
  let totalNumOfOrders = 0;

  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOfOrders = entry?.numOfOrders;

    salesMap.set(date, { sales, numOfOrders });
    totalSales += sales;
    totalNumOfOrders += numOfOrders;
  });

  // Generate an array of dates between start & end Date
  const datesBetween = getDatesBetween(startDate, endDate);

  // Create final sales data array with 0 for dates without sales
  const finalSalesData = datesBetween.map((date) => ({
    date,
    sales: salesMap.get(date)?.sales ?? 0, // if date exists in salesMap then assign to sales || assign 0
    numOfOrders: salesMap.get(date)?.numOfOrders ?? 0,
  }));
  

  return { salesData: finalSalesData, totalSales, totalNumOfOrders };
    
}

// helper function to generate an array of dates between start & end Date
function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1); // moving loop to next date
  }

  return dates;
}

// Get Sales Data  =>  /api/v1/admin/get_sales
export const getSales = catchAsyncErrors(async(req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  // whole day
  startDate.setUTCHours(0, 0, 0, 0); //12 AM
  endDate.setUTCHours(23, 59, 59, 999); //12 PM

  const { salesData, totalSales, totalNumOfOrders } = await getSalesData(
    startDate,
    endDate
  );

  res.status(200).json({
    totalSales,
    totalNumOfOrders,
    sales: salesData,
  });
})