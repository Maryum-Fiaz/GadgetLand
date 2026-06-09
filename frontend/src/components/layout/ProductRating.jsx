import { Star } from "lucide-react";

function ProductRating({ rating = 0, reviewsCount }) {
  
  const totalStars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1.5 font-sans">
      
      <div className="flex items-center">
        {totalStars.map((starIndex) => {
          // Check if the current star should be filled or empty
          const isFilled = starIndex <= Math.round(rating);

          return (
            <Star
              key={starIndex}
              size={14}
              // If filled, amber color. If empty, gray color.
              className={`transition-colors duration-200 ${
                isFilled 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-zinc-200 fill-zinc-100"
              }`}
            />
          );
        })}
      </div>

      {/* 📊 Optional: Show the exact text rating and reviews count if passed down */}
      {reviewsCount !== undefined && (
        <span className="text-xs font-semibold text-zinc-500 ml-1">
          {rating.toFixed(1)} <span className="text-zinc-400 font-normal">({reviewsCount})</span>
        </span>
      )}
    </div>
  );
}

export default ProductRating;