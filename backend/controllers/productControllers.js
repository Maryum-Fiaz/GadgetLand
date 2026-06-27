import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/product.js";
import ApiFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../models/order.js";
import { upload_file } from "../utils/cloudinary.js";

// Get Products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 6;
  const apiFilters = new ApiFilters(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFilters.query;

  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// Create new Product  =>  /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// Get Single Product => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params?.id).populate(
    "reviews.user",
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
});

// Get products - ADMIN   =>  /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});

// Update Product details => /api/v1/admin/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

// Upload product images   =>  /api/v1/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const imagesArray = req?.body?.images;

  const urls = await Promise.all(
    imagesArray.map(async (image) => {
      return await upload_file(image, "gadgetland/products");
    }),
  );

  product?.images?.push(...urls); // store urls in product database
  await product?.save({ validateBeforeSave: false });

  res.status(200).json({
    product,
  });
});

// Delete Product details => /api/v1/admin/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
});

// * Reviews

// Create/Update product review   =>  /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, rating, productId } = req.body;

  const review = {
    user: req.user?._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewd = product.reviews.find(
    (r) => r.user.toString() === req.user?._id.toString(),
  );

  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product reviews   =>  /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate("reviews.user");

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Can user review => /api/v1/can_review
export const canUserReview = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });

  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  res.status(200).json({
    canReview: true,
  });
});
