import { useEffect } from "react";
import { ProductCard } from "../index";
import toast from "react-hot-toast";
import { Flame } from "lucide-react"; // Sleek accent icon for top selling

const TopSelling = ({ data = [], error }) => {
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load top selling items");
    }
  }, [error]);

  const topSellingProducts = data?.topSelling || [];

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-mauve-100/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-mauve-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-mauve-500 block">
              Top gears
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-mauve-950 uppercase tracking-tight font-heading leading-none">
            Top Selling
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-mauve-500 max-w-xs font-light leading-relaxed">
          The absolute standard in premium workspace essentials, handpicked for
          creative performance.
        </p>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topSellingProducts.map((product) => (
          <div key={product._id} className="relative group">
            
            {/* Hot seller */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-lg shadow-md pointer-events-none transition-transform duration-300 group-hover:scale-105">
              <Flame size={11} className="fill-white/20 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                Hot Seller
              </span>
            </div>

            <ProductCard product={product?.productDetails} />
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSelling;