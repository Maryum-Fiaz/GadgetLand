
import { ShoppingCart, Star } from 'lucide-react';
import Container from '../Container';
import { useGetProductsQuery } from '../../redux/api/productApi';

function Products() {

  const {data, isLoading, error} = useGetProductsQuery();

  if (isLoading) {
        return <div className="text-center py-20 font-mono text-zinc-500">Querying backend database controller...</div>;
    }

  if (error) {
        return (
            <div className="max-w-md mx-auto my-10 p-5 bg-red-50 border border-red-200 text-red-700 rounded-xl font-sans">
                <p className="font-bold">Backend Communication Failed</p>
                <p className="text-xs text-red-500 mt-1">{error.message || "Is your backend server running on port 5000?"}</p>
            </div>
        );
    }

    const productList = data?.products || [];

  return (
    <section className="w-full bg-zinc-50 py-12 font-sans">
      <Container>
        
        {/* Header Metadata Frame */}
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <h2 className="font-heading text-2xl font-black tracking-tight text-zinc-900">
              Our Products
            </h2>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-mauve-600 transition-colors cursor-pointer">
            <span>View all</span>
            <span className="text-sm font-normal">→</span>
          </button>
        </div>

        {/* Responsive Product Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
          {productList.map((product) => (
            <div 
              key={product._id} 
              className="group relative flex flex-col bg-white border border-zinc-200/60 rounded-3xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1"
            >
              
              {/* Image Frame Container */}
              <div className="w-full h-48 rounded-2xl bg-zinc-50 flex items-center justify-center overflow-hidden mb-4">
                <img 
                  src={product?.image} 
                  alt={product.name} 
                  className="max-h-36 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Metadata Layout */}
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-zinc-900 text-base tracking-tight group-hover:text-mauve-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Micro Star Rating Module */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 mt-0.5">
                  <div className="flex items-center text-amber-400">
                    <Star size={12} fill="currentColor" stroke="none" />
                    <Star size={12} fill="currentColor" stroke="none" />
                    <Star size={12} fill="currentColor" stroke="none" />
                    <Star size={12} fill="currentColor" stroke="none" />
                    <Star size={12} fill="currentColor" stroke="none" />
                  </div>
                  <span className="text-zinc-600 ml-1">{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>
              </div>

              {/* Footer Interactive Row: Price & Action Cart Button */}
              <div className="flex items-center justify-between mt-6 pt-2 border-t border-zinc-50">
                <span className="font-black text-zinc-900 text-lg tracking-tight">
                  {product.price}
                </span>
                
                {/* Circle Icon Button using pure Native Mauve utilities */}
                <button className="p-2.5 bg-zinc-100 text-zinc-600 hover:bg-mauve-50 hover:text-mauve-600 active:scale-95 rounded-xl transition-all cursor-pointer">
                  <ShoppingCart size={16} strokeWidth={2.5} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default Products