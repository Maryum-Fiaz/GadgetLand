import { useState } from 'react';
import { Star } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { getPriceQueryParams } from '../../helper/helper';
import { PRODUCT_CATEGORIES } from '../../constants/constants';


function Filters() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle category & rating filter
  const handleCheck = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name)

    checkboxes.forEach(box => 
      {if(box !== checkbox) box.checked = false}
  )

  let newParams = new URLSearchParams(searchParams)

  if(checkbox.checked === false) {
    newParams.delete(checkbox.name)

  } else {
    newParams.set(checkbox.name, checkbox.value)
  }

  setSearchParams(newParams)
  }


  // Handle price filter
  const handlePriceSubmit = (e) => {
    e.preventDefault();

    let newParams = new URLSearchParams(searchParams);

    newParams = getPriceQueryParams(newParams, "min", minPrice);
    newParams = getPriceQueryParams(newParams, "max", maxPrice);

    setSearchParams(newParams);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* 💰 Price Filter Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-sans">
          Filter by Price
        </h3>
        <form onSubmit={handlePriceSubmit} className="flex gap-2 items-center">
          <div className="flex items-center bg-zinc-100/80 border border-zinc-200/60 rounded-xl px-3 py-2 w-full shadow-inner">
            <span className="text-zinc-400 mr-1 text-xs">$</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-zinc-700 outline-none"
            />
          </div>
          <span className="text-zinc-300 text-xs">—</span>
          <div className="flex items-center bg-zinc-100/80 border border-zinc-200/60 rounded-xl px-3 py-2 w-full shadow-inner">
            <span className="text-zinc-400 mr-1 text-xs">$</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-zinc-700 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-mauve-600 hover:bg-mauve-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Go
          </button>
        </form>
      </div>

      {/* 📁 Category Filter Section */}
      <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-sans">
          Categories
        </h3>
        <div className="flex flex-col gap-2.5">
          {PRODUCT_CATEGORIES.map((category) => (
            <label 
              key={category}
              className="flex items-center gap-2.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <input 
                type="checkbox"
                name="category"
                value={category}
                onClick={(e) => handleCheck(e.target)}
                defaultChecked={searchParams.get("category") === category}  // TODO: -> check why not working?
                className="w-4 h-4 rounded border-zinc-300 text-zinc-900 accent-zinc-900 focus:ring-0 cursor-pointer" 
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ⭐ Ratings Filter Section */}
      <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 font-sans">
          Minimum Rating
        </h3>
        <div className="flex flex-col gap-2.5">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label 
              key={stars} 
              className="flex items-center gap-2.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <input 
                type="radio" 
                name="rating" 
                className="w-4 h-4 border-zinc-300 text-zinc-900 accent-zinc-900 focus:ring-0 cursor-pointer" 
              />
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={13} 
                    fill={i < stars ? "#fbbf24" : "none"} 
                    className={i < stars ? "text-amber-400" : "text-zinc-200"} 
                  />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Filters;