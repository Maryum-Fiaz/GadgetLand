import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Search, Star } from "lucide-react";
import { CustomTable, MetaData, Loader } from "../../components";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productApi";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Deleted Successfully");
    }
  }, [error, deleteError, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      return toast.error("Please enter a valid Product ID first.");
    }
    getProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
      deleteReview({ productId, id });
  };

  const tableColumns = [
    { label: "Review ID", field: "id", align: "left" },
    { label: "User", field: "user", align: "left" },
    { label: "Rating", field: "rating", align: "left" },
    { label: "Comment", field: "comment", align: "left" },
    { label: "Actions", field: "actions", align: "right" },
  ];

  const tableData = data?.reviews?.map((review) => {
    return {
      id: (
        <span className="font-mono text-xs text-zinc-400 select-all">
          {review?._id}
        </span>
      ),
      user: (
        <span className="text-xs font-bold text-zinc-800">
          {review?.user?.name || "Anonymous"}
        </span>
      ),
      rating: (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold rounded-md border ${
          review?.rating >= 4
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : review?.rating >= 3
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-rose-50 text-rose-700 border-rose-200"
        }`}>
          <Star size={10} className="fill-current" />
          {review?.rating}
        </span>
      ),
      comment: (
        <span className="text-xs text-zinc-500 max-w-sm block truncate" title={review?.comment}>
          {review?.comment}
        </span>
      ),
      actions: (
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => deleteReviewHandler(review?._id)}
            disabled={isDeleteLoading}
            className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center text-zinc-400 hover:text-rose-600 transition-colors disabled:opacity-40 cursor-pointer"
            title="Delete Review"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    };
  }) || [];

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Product Reviews"} />

      <div className="w-full max-w-5xl mx-auto px-4 py-4 font-sans space-y-8">
        
        {/* Top Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tight font-heading">
              Product Reviews
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Search for a product ID to view and manage its customer reviews
            </p>
          </div>
        </div>

        {/* Search Block */}
        <form onSubmit={submitHandler} className="max-w-md flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="productId_field" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Product ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="productId_field"
                placeholder="Paste product ID here..."
                className="w-full h-10 pl-9 pr-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
              <Search className="absolute left-3 top-3 text-zinc-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          
          <button
            type="submit"
            className="h-10 px-5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-xs"
          >
            Search
          </button>
        </form>

        {/* Dynamic Content Display Area */}
        {isLoading ? (
          <div className="py-12 flex justify-center"><Loader /></div>
        ) : data?.reviews?.length > 0 ? (
          <div className="pt-2 animate-fade-in">
            <CustomTable columns={tableColumns} data={tableData} />
          </div>
        ) : data ? (
          <div className="py-12 text-center border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
            <p className="text-xs font-medium text-zinc-400">No reviews found for this product.</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductReviews;