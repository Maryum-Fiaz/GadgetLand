import { useState } from 'react'
import { Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

function SearchBar() {

    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate();
    const location = useLocation()

    //TODO: -> add debounce for better performance


    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword?.trim()) {
            navigate(`/products?keyword=${keyword}`)
        } else {
          if(location.pathname === "/products")
            navigate('/products')
        }
    }
    console.log('render in search bar....', keyword);
    

  return (
    <form onSubmit={submitHandler} className="relative flex items-center group h-10">
        <input
                type="text"
                placeholder="Search premium tech..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-10 group-hover:w-56 focus:w-56 h-full pl-10 pr-4 rounded-xl border border-transparent bg-transparent group-hover:bg-white focus:bg-white group-hover:border-zinc-200 focus:border-zinc-200 font-sans text-xs font-medium outline-none transition-all duration-300 ease-in-out cursor-pointer group-hover:cursor-text focus:cursor-text"
              />
              <div className="absolute left-3 pointer-events-none text-zinc-600 group-hover:text-mauve-500 focus:text-mauve-500 transition-colors">
                <Search size={18} strokeWidth={2.2} />
              </div>
    </form>
  )
}

export default SearchBar