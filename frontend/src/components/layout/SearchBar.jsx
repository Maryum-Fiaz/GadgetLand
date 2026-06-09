import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";


function SearchBar() {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const navigate = useNavigate();
  
  
  const submitHandler = (e) => {
    e.preventDefault()

    const newParams = new URLSearchParams(searchParams)

    console.log(newParams);

    if(keyword.trim()){
      if(newParams.has('page')){
        newParams.set('page', 1)
      }
      newParams.set('keyword', keyword)

    } else {
      newParams.delete('keyword')
    }

    navigate(`/products?${newParams}`)

  }


  return (
    <form onSubmit={submitHandler} className="relative flex items-center group h-10">
      <input
        type="text"
        placeholder="Search premium tech..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-10 group-hover:w-56 focus:w-56 h-full pl-10 pr-4 rounded-xl border border-transparent bg-transparent group-hover:bg-white focus:bg-white group-hover:border-zinc-200 focus:border-zinc-200 font-sans text-xs font-medium outline-none transition-all duration-300 ease-in-out cursor-pointer group-hover:cursor-text focus:cursor-text"
      />
      {/* TODO : get prop of mobileView = true & by default it should be 'false' & then conditionally write tailwind of inputbox to provide 'x' to close search bar */}

      <div className="absolute left-3 pointer-events-none text-zinc-600 group-hover:text-mauve-500 focus:text-mauve-500 transition-colors">
        <Search size={18} strokeWidth={2.2} />
      </div>
    </form>
  );
}

export default SearchBar;

// return (
//   <form ref={searchRef} onSubmit={handleSearchSubmit} className="relative flex items-center h-10">
//     <input
//       type="text"
//       placeholder="Search premium tech..."
//       value={keyword}
//       onChange={(e) => setKeyword(e.target.value)}
//       // 🎯 Show input if open OR if there's text inside it from the URL
//       className={`h-full pl-10 pr-4 rounded-xl border font-sans text-xs font-medium outline-none transition-all duration-300 ease-in-out bg-white border-zinc-200
//         ${isOpen || keyword ? "w-56 opacity-100" : "w-0 opacity-0 pointer-events-none border-transparent"}`}
//     />

//     <button
//       type="button"
//       onClick={handleIconClick}
//       className="absolute left-3 text-zinc-600 hover:text-mauve-500 transition-colors cursor-pointer z-10"
//     >
//       <Search size={18} strokeWidth={2.2} />
//     </button>
//   </form>
