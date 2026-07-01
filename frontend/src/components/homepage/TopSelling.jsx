import { useEffect } from 'react';
import { ProductCard } from '../index';
import toast from 'react-hot-toast';

const TopSelling = ({ data = [] , error}) => {

    
    console.log('data -> ',data?.topSelling);
    console.log('error -> ', error)

    useEffect(() => {
        if(error){
            toast.error(error?.data?.message || "Failed to load top selling items") // how can we use isLoading and error as this is just section of homepage so we need loading on homepage until all sections load
        }
    }, [error])
    
    const topSellingProducts = data?.topSelling || [];

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      
      {/* Editorial Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-mauve-400 block mb-2">
            Curated Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-mauve-950 uppercase tracking-tight font-heading">
            Top Selling Gear
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-mauve-500 max-w-xs font-light leading-relaxed">
          The absolute standard in premium workspace essentials, handpicked for creative performance.
        </p>
      </div>

      {/* Fully Responsive Product Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topSellingProducts.map((product) => (
          <ProductCard key={product._id} product={product?.productDetails} />
        ))}
      </div>

    </section>
  );
};

export default TopSelling;