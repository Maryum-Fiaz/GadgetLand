import { useEffect, useState } from "react";
import { Star } from "lucide-react"; // Double check your project's path or icon source

import { toast } from "react-hot-toast";
import { useCanUserReviewQuery, useSubmitReviewMutation } from "../../redux/api/productApi";

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // Track transient cursor hovering
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();
  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;
  

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Review Posted successfully!");
      setComment("");
      setRating(0);
      setHoverRating(0);
      setIsOpen(false);
    }
  }, [error, isSuccess]);

  const submitHandler = () => {
    if (rating === 0) {
      toast.error("Please pick a rating star sequence.");
      return;
    }
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  return (
    <div className="w-full">
      {canReview && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 text-zinc-900 hover:bg-zinc-900 hover:text-white border boder-zinc-900 text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
        >
          Submit Your Review
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white border border-zinc-200 w-full max-w-md rounded-2xl p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 font-sans text-lg cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-50"
            >
              ✕
            </button>

            <div className="mb-5">
              <h3 className="text-lg font-black tracking-tight text-zinc-900 font-heading">
                Submit Review
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-normal">
                Share your hardware validation experience with others.
              </p>
            </div>

            <div className="space-y-5">
              {/* INTERACTIVE NATIVE STAR PIPELINE */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((index) => {
                    // Fill if index is below target active rating OR currently hovered rating
                    const isFilled = index <= (hoverRating || rating);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHoverRating(index)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 -ml-1 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer outline-none"
                      >
                        <Star
                          size={24}
                          fill={isFilled ? "#fbbf24" : "none"}
                          className={`transition-colors duration-150 ${
                            isFilled ? "text-amber-400" : "text-zinc-200"
                          }`}
                        />
                      </button>
                    );
                  })}
                  
                  {/* Subtle Context State String Tag */}
                  {(hoverRating || rating) > 0 && (
                    <span className="text-xs font-mono font-bold text-zinc-400 ml-1.5 pt-0.5">
                      ({hoverRating || rating} / 5)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="review-comment" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                  Review Statement
                </label>
                <textarea
                  id="review-comment"
                  name="review"
                  rows="4"
                  className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-mauve-500 focus:ring-2 focus:ring-mauve-100 rounded-xl p-3.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition-all resize-none"
                  placeholder="Describe your assessment criteria, build quality, performance stability..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={submitHandler}
                className="w-full h-12 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 disabled:bg-zinc-200 text-white disabled:text-zinc-400 font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? "Submitting Statement..." : "Publish Review"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default NewReview;