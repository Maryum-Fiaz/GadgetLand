import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

function SearchBar() {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [isOpen, setIsOpen] = useState(false); // Controls the full overlay view
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Automatically focus the input box the exact millisecond the overlay pops up
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);

    if (keyword.trim()) {
      if (newParams.has("page")) {
        newParams.set("page", 1);
      }
      newParams.set("keyword", keyword);
    } else {
      newParams.delete("keyword");
    }

    navigate(`/products?${newParams}`);
    setIsOpen(false); // Close modal instantly when routing triggers
  };

  return (
    <>
      {/* 🔍 TRIGGER ICON: Always visible on both mobile and desktop headers */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-600 hover:text-mauve-500 transition-colors cursor-pointer"
      >
        <Search size={20} strokeWidth={2.2} />
      </button>

      {/* 🖼️ FULL OVERLAY PANEL: Displays across all viewports when triggered */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-900/40 backdrop-blur-md pt-20 px-4 animate-in fade-in duration-200">
          
          {/* Main search form wrapper */}
          <form 
            onSubmit={submitHandler} 
            className="relative flex items-center w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-xl h-14 px-4 overflow-hidden"
          >
            <Search size={20} className="text-zinc-400 shrink-0" />
            
            <input
              ref={inputRef}
              type="text"
              placeholder="Search premium tech products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-full pl-3 pr-12 font-sans text-sm font-medium outline-none text-zinc-800 bg-transparent"
            />

            {/* 🎯 CLEAR / CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => {
                if (keyword) {
                  setKeyword(""); // First click clears typing text entry
                } else {
                  setIsOpen(false); // Second click shuts down modal window layer
                }
              }}
              className="absolute right-4 p-1 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={2.2} />
            </button>
          </form>

          {/* BACKGROUND CLICK AWAY MASK LAYER */}
          <div 
            className="absolute inset-0 -z-10 cursor-default" 
            onClick={() => setIsOpen(false)} 
          />
        </div>
      )}
    </>
  );
}

export default SearchBar;