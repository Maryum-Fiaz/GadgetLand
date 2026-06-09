import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import ProductRating from '../layout/ProductRating';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div 
      // TODO -> go to product details page
      onClick={() => navigate(`/product/${product._id}`)}
      className="group relative flex flex-col bg-white border border-zinc-200/60 rounded-3xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1 min-h-105 cursor-pointer"
    >
      {/* 1. Image Frame */}
      <div className="w-full h-48 rounded-2xl bg-zinc-50 flex items-center justify-center overflow-hidden mb-4 shrink-0">
        <img 
          src={product?.images[0]?.url} 
          alt={product.name} 
          className="max-h-36 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 2. Text Frame (Pushes content up) */}
      <div className="flex flex-col gap-1 grow">
        <h3 className="font-bold text-zinc-900 text-base tracking-tight group-hover:text-mauve-600 transition-colors line-clamp-2 h-12 overflow-hidden">
          {product.name}
        </h3>
        
        {/* Star Badges */}
        <ProductRating rating={product.ratings} reviewsCount={product.numOfReviews} />
      </div>

      {/* 3. Footer Action Frame */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
        <span className="font-black text-zinc-900 text-lg tracking-tight">${product.price}</span>
        <button className="p-2.5 bg-zinc-100 text-zinc-600 hover:bg-mauve-50 hover:text-mauve-600 rounded-xl transition-all">
          <ShoppingCart size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;