

import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Container from '../components/Container';
import { ProductCard } from '../components/index';
import { useState } from 'react';
import { useGetProductsQuery } from '../redux/api/productApi';


function Products() {
const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div className="text-center py-20 font-mono text-zinc-500">Loading products...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Connection Error</div>;

  const productList = data?.products || [];

  return (
    <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased">
      <Container>
        
        {/* 🏷️ SECTION 1: Minimalist Header Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-12 pb-6 px-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Our Products
            </h1>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">
              Architecture / Premium Tech Gear
            </p>
          </div>

          {/* 📱 Mobile Quick Filter Row: Hidden on Desktop, Visible on Mobile */}
          <div className="flex items-center gap-2 self-stretch lg:hidden mt-2">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="grow flex items-center justify-center gap-2 px-4 py-3 bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700 rounded-2xl shadow-sm active:bg-zinc-50 transition-all cursor-pointer"
            >
              <SlidersHorizontal size={14} className="text-mauve-500" />
              <span>Filter & Refine</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-700 rounded-2xl shadow-sm cursor-pointer">
              <span>Sort</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>
          </div>

          {/* Desktop Filter Controls Header Panel (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-600 rounded-xl shadow-sm hover:border-zinc-300 transition-all cursor-pointer">
                <span>Sort: Featured</span>
                <ChevronDown size={14} className="text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 🌌 SECTION 2: Grid Split Canvas Workspace */}
        <div className="flex gap-8 py-4 lg:py-10 px-2">
          
          {/* 📐 DESKTOP SIDEBAR: Hidden on screens smaller than 1024px (lg) */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0 sticky top-28 h-fit">
            {/* ... Your desktop sidebar blocks category/price/rating here ... */}
            <div className="text-xs font-black uppercase tracking-widest text-zinc-400">Categories</div>
            <ul className="text-sm font-semibold text-zinc-500 space-y-2">
              <li className="px-3 py-2 bg-mauve-50/60 text-mauve-700 rounded-xl">All Collections</li>
              <li className="px-3 py-2 hover:bg-zinc-100 rounded-xl cursor-pointer">Audio Gear</li>
            </ul>
          </aside>

          {/* 📦 CARD CANVAS DISPLAY PANEL */}
          <main className="grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productList?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </main>

        </div>

        {/* 🚨 📱 SECTION 3: THE IMMERSIVE MOBILE FILTER DRAWER OVERLAY */}
        {/* Animated backdrop mask layer overlay */}
        <div className={`fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          
          {/* Slide-Up White Card Frame Box layout sheet */}
          <div className={`fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[32px] shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isMobileFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            
            {/* Header Toolbar block */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-mauve-500" />
                <h2 className="text-base font-black tracking-tight text-zinc-900">Filter Products</h2>
              </div>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 bg-zinc-100 text-zinc-500 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Filtering Interactive Form Canvas Options List */}
            <div className="grow overflow-y-auto p-6 flex flex-col gap-8">
              
              {/* Category Selector Block */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Audio Gear', 'Computers', 'Wearables'].map((cat, i) => (
                    <button key={cat} className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${i === 0 ? 'bg-mauve-500 border-mauve-500 text-white shadow-sm shadow-mauve-100' : 'bg-zinc-50 border-zinc-200 text-zinc-600'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Numeric Boundary Matrix Inputs */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Price Range</h3>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full shadow-inner">
                    <span className="text-zinc-400 mr-1">$</span>
                    <input type="number" placeholder="Min" className="w-full bg-transparent outline-none font-semibold text-zinc-700" />
                  </div>
                  <span className="text-zinc-300 font-sans px-1">—</span>
                  <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 w-full shadow-inner">
                    <span className="text-zinc-400 mr-1">$</span>
                    <input type="number" placeholder="Max" className="w-full bg-transparent outline-none font-semibold text-zinc-700" />
                  </div>
                </div>
              </div>

              {/* Quality Metrics Matrix Selection */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Minimum Rating</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[4.8, 4.5, 4.0].map((rating, idx) => (
                    <button key={rating} className={`flex items-center justify-center gap-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${idx === 0 ? 'bg-mauve-50 border-mauve-300 text-mauve-700' : 'bg-zinc-50 border-zinc-200 text-zinc-500'}`}>
                      <span>{rating}</span>
                      <span>★</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Bottom Action Frame Buttons Anchor */}
            <div className="p-4 border-t border-zinc-100 grid grid-cols-2 gap-3 bg-zinc-50/50 rounded-b-[32px]">
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="py-3 bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-500 rounded-xl shadow-sm cursor-pointer"
              >
                Clear All
              </button>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="py-3 bg-mauve-500 hover:bg-mauve-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-mauve-200 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>

      </Container>
    </div>
  );
}

export default Products;

// import { useGetProductsQuery } from '../redux/api/productApi'
// import ProductCard from '../components/product/ProductCard'; 

// function Products() {
//     const { data, isLoading, error } = useGetProductsQuery();

//   if (isLoading) return <div className="text-center py-20 font-mono text-zinc-500">Loading products...</div>;
//   if (error) return <div className="text-center py-20 text-red-500">Connection Error</div>;

//   const productList = data?.products || [];

//   return (
//     <section className="w-full bg-zinc-50 py-12 font-sans min-h-screen">
//       <Container>
        
//         {/* 🛠️ FRONTEND FILTERS WORKSPACE PLACEHOLDER */}
//         <div className="bg-white p-4 rounded-2xl border border-zinc-200 mb-8">
//           <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Filters & Search Bar Go Here</p>
//         </div>

//         {/* 📦 THE THE GRID LAYOUT DESIGN */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
//           {productList.map((singleProduct) => (
//             // 🎯 We loop and call the ProductCard component, feeding it the data item as a prop!
//             <ProductCard key={singleProduct._id} product={singleProduct} />
//           ))}
//         </div>

//         {/* 🎛️ FRONTEND PAGINATION FOOTER BUTTONS WORKSPACE PLACEHOLDER */}
//         <div className="flex justify-center items-center gap-4 mt-12 border-t border-zinc-200/60 pt-6">
//           <button className="px-4 py-2 bg-white border border-zinc-200 text-sm font-semibold rounded-xl text-zinc-400">Previous</button>
//           <span className="font-bold text-sm text-zinc-700">Page 1</span>
//           <button className="px-4 py-2 bg-white border border-zinc-200 text-sm font-semibold rounded-xl text-zinc-700">Next</button>
//         </div>

//       </Container>
//     </section>
//   );
// }

// export default Products;