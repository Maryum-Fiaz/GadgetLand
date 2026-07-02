import { Star, User } from "lucide-react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="w-full space-y-6">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 font-sans">
        Customers Reviews ({reviews?.length || 0})
      </h3>

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?._id} className="space-y-4">
            <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
              {/* User Identity Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 shrink-0">
                  <User size={16} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800 font-sans">
                    {review?.user?.name || "Anonymous User"}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Verified Buyer
                  </span>
                </div>
              </div>

              {/* Star Rating Strip */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < review?.rating ? "#fbbf24" : "none"}
                    className={
                      i < review?.rating ? "text-amber-400" : "text-zinc-200"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Comment Body */}
            <p className="text-sm text-zinc-600 leading-relaxed pl-12 font-normal">
              {review?.comment}
            </p>

            {/* Dividing Separator */}
            <hr className="border-zinc-200/60 pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListReviews;
