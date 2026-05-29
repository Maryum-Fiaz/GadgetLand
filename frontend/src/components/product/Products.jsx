
import { ShoppingCart, Star } from 'lucide-react';
import Container from '../Container';

// 📦 High-fidelity dummy dataset straight from your mockup blueprint
const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "AirPods Max",
    price: "$5449.00",
    rating: "4.8",
    reviews: "1.2K",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=80" // High-res placeholder image
  },
  {
    id: 2,
    title: "AirPods Pro 2",
    price: "$249.00",
    rating: "4.7",
    reviews: "2.3K",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Apple Watch Series 9",
    price: "$399.00",
    rating: "4.6",
    reviews: "1.8K",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "iPhone 15 Pro",
    price: "$999.00",
    rating: "4.8",
    reviews: "3.1K",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=80"
  }
];

function Products() {

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
          {DUMMY_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="group relative flex flex-col bg-white border border-zinc-200/60 rounded-3xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1"
            >
              
              {/* Image Frame Container */}
              <div className="w-full h-48 rounded-2xl bg-zinc-50 flex items-center justify-center overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-36 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Metadata Layout */}
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-zinc-900 text-base tracking-tight group-hover:text-mauve-600 transition-colors">
                  {product.title}
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