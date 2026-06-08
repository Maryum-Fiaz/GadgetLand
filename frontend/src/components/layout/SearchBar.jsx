import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import useDebounce from "../../hook/useDebounce";

function SearchBar() {
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const debounceValue = useDebounce(keyword, 500);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/products") return;

    let newParams = new URLSearchParams(window.location.search); // convert search string into object

    if (debounceValue.trim()) {
      newParams.set("keyword", debounceValue.trim());
      newParams.set("page", "1");
    } else {
      newParams.delete("keyword");
    }
    const searchString = newParams.toString(); // object back to (search) string
    const targetPath = searchString ? `/products?${searchString}` : "/products";

    navigate(targetPath);
  }, [debounceValue, navigate, location.pathname]);

  return (
    <div className="relative flex items-center group h-10">
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
    </div>
  );
}

export default SearchBar;
