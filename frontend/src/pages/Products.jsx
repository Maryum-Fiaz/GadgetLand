import { SlidersHorizontal, X } from "lucide-react";
import Container from "../components/Container";
import { CustomPagination, Filters, Loader, ProductCard } from "../components/index.js";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";

function Products() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const queryParams = { page, keyword };

  if (min !== null) queryParams.min = min;
  if (max !== null) queryParams.max = max;
  if (category !== null) queryParams.category = category;
  if (ratings !== null) queryParams.ratings = ratings;

  const { data, isLoading, error, isError } = useGetProductsQuery(queryParams);
  
 useEffect(() => {
  if (isError) {
    
    const errorMessage = error?.data?.message || "Failed to fetch products. Connection Error.";
    toast.error(errorMessage);
  }
}, [isError, error]);


  if (isLoading) return <Loader />
  

  const productList = data?.products || [];

  return (
    <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased">
      <Container className="pb-1">
        {/* 🏷️ SECTION 1: Minimalist Header Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-12 pb-6 px-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              {keyword ? `Search Results for "${keyword}"` : "Our Products"}
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
          </div>
        </div>

        {/* 🌌 SECTION 2: Grid Split Canvas Workspace */}
        <div className="flex gap-8 py-4 lg:py-10 px-2">
          {/* 📐 DESKTOP SIDEBAR: Hidden on screens smaller than 1024px (lg) */}
          <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0 sticky top-28 h-fit">
            <Filters />
          </aside>

          {/* 📦 CARD CANVAS DISPLAY PANEL */}
          <main className="grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productList.length > 0 ? (
                productList?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <span>No Products found</span>
              )}
            </div>
          </main>
        </div>

        {/* 🚨 📱 SECTION 3: THE IMMERSIVE MOBILE FILTER DRAWER OVERLAY */}
        {/* Animated backdrop mask layer overlay */}
        <div
          className={`fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMobileFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          {/* Slide-Up White Card Frame Box layout sheet */}
          <div
            className={`fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-4xl shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isMobileFilterOpen ? "translate-y-0" : "translate-y-full"}`}
          >
            {/* Header Toolbar block */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-mauve-500" />
                <h2 className="text-base font-black tracking-tight text-zinc-900">
                  Filter Products
                </h2>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 bg-zinc-100 text-zinc-500 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Filtering Interactive Form Canvas Options List */}
            <div className="grow overflow-y-auto p-6">
              <Filters />
            </div>
          </div>
        </div>

        <CustomPagination
          resPerPage={data?.resPerPage || 6}
          filteredProductsCount={data?.filteredProductsCount || 0}
        />
      </Container>
    </div>
  );
}

export default Products;
