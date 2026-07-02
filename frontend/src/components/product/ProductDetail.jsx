import { useEffect, useState } from "react";
import {
    Container,
  ListReviews,
  Loader,
  MetaData,
  NewReview,
  ProductRating,
} from "../index.js";
import { useGetProductDetailsQuery } from "../../redux/api/productApi.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import defaultProduct from "../../assets/defaultProduct.png";
import { setCartItem } from "../../redux/features/cartSlice.js";

function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();

  const [activeImg, setActiveImg] = useState(defaultProduct);
  const [quantity, setQuantity] = useState(1);

  // fetching product data
  const { data, error, isError, isLoading } = useGetProductDetailsQuery(
    params?.id,
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const product = data?.product;

  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0].url : defaultProduct);
  }, [product]);

  useEffect(() => {
    if (isError) {
      const errorMessage = error?.data?.message || "Failed to fetch product.";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  // Quantity increase/decrease
  const increaseQty = () => {
    if (quantity >= product?.stock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  // Adding item to cart
  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };

  return (
    <Container>
      <MetaData title={product?.name} />

      <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased selection:bg-mauve-100 selection:text-mauve-900 px-4 sm:px-6 py-8 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* LEFT Side: Images */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hero Image */}
            <div className="w-full bg-white border border-zinc-200/80 rounded-4xl p-4 sm:p-12 flex items-center justify-center min-h-85 sm:min-h-115 shadow-xs">
              <img
                className="max-h-80 sm:max-h-95 w-auto object-contain"
                src={activeImg}
                alt={product?.name}
              />
            </div>

            <div className="flex flex-wrap gap-3.5 justify-start px-1">
              {product?.images?.map((img) => {
                const isSelected = img.url === activeImg;
                return (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImg(img.url)}
                    className={`h-16 w-16 p-2 bg-white rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "border-zinc-800 ring-4 ring-zinc-200/50"
                        : "border-zinc-200/80 hover:border-zinc-400"
                    }`}
                  >
                    <img
                      src={img?.url}
                      alt="Thumbnail asset preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE*/}
          <div className="lg:col-span-6 py-2 space-y-6">
            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 font-heading leading-tight">
                {product?.name}
              </h1>
              <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-zinc-400">
                <span>PRODUCT / #{product?._id}</span>
                <span>•</span>
                <span className="font-sans font-medium text-zinc-500">
                  Sold by {product?.seller}
                </span>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3 py-1">
              <ProductRating
                rating={product?.ratings}
                numOfReviews={product?.numOfReviews}
              />
              <span className="text-xs font-bold text-zinc-400 pt-0.5">
                ({product?.numOfReviews} Reviews)
              </span>
            </div>

            <hr className="border-zinc-200/80" />

            {/* price & stock */}
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-zinc-900">
                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 block mb-0.5">
                  Price
                </span>
                <div className="text-3xl font-black">
                  Rs.{" "}
                  <span className="font-sans font-extrabold text-2xl ml-0.5">
                    {product?.price?.toLocaleString()}/-
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    product?.stock > 0
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : "bg-rose-50 text-rose-600 border-rose-200/60"
                  }`}
                >
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* inc / dec Qty + Add to Cart btn */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch pt-2">
              <div className="h-12 flex items-center justify-between sm:justify-start bg-white border border-zinc-200 rounded-xl px-2 shadow-2xs">
                <button
                  type="button"
                  onClick={decreaseQty}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer active:scale-90"
                >
                  —
                </button>
                <input
                  type="number"
                  className="w-12 bg-transparent text-center font-sans text-sm font-bold text-zinc-800 outline-none select-none"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  onClick={increaseQty}
                  className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer active:scale-90"
                >
                  ＋
                </button>
              </div>

              {/* Add to cart Button */}
              <button
                type="button"
                disabled={product?.stock <= 0}
                onClick={setItemToCart}
                className="flex-1 h-12 p-4 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>

            <hr className="border-zinc-200/80" />

            {/* Product Summary */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Technical Details / Specifications
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                {product?.description}
              </p>
            </div>

            {/* Customer Review Feedback, show if Authentic user */}
            <div className="pt-2">
              {isAuthenticated ? (
                <NewReview productId={product?._id} />
              ) : (
                <div className="bg-white border border-dashed border-zinc-200/80 p-4 rounded-xl text-center">
                  <p className="text-xs font-medium text-zinc-500">
                    Want to share feedback?{" "}
                    <a
                      href="/login"
                      className="text-mauve-600 font-bold hover:underline transition-colors"
                    >
                      Sign in to post an official user review.
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER: Reviews */}
        {product?.reviews?.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12 md:mt-20 pt-8 border-t border-zinc-200/80">
            <ListReviews reviews={product?.reviews} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default ProductDetail;
