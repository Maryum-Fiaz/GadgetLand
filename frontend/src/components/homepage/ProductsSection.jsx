import { useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { ProductCard } from '../index';

const ProductsSection = ({data = []}) => {
  const navigate = useNavigate();
  const products = data?.homeNewArrivals || [];

  return (
    <section className="w-full bg-[#fdfbfe] py-24 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-mauve-100/60 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-mauve-300" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-mauve-500 block">
                Latest Releases
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-mauve-950 uppercase tracking-tight font-heading leading-none">
              New Arrivals
            </h2>
          </div>

          <button 
            onClick={() => navigate('/products')}
            className="group flex items-center gap-1.5 text-mauve-950 hover:text-mauve-600 transition-colors font-heading font-black tracking-widest text-[10px] uppercase cursor-pointer"
          >
            View All 
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-mauve-400 group-hover:text-mauve-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;