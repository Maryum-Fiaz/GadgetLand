import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  // Total pages needed
  const totalPages = Math.ceil(filteredProductsCount / resPerPage);

  // Scroll up on each page click
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // If all products fit on single page, hide the pagination bar
  if (filteredProductsCount <= resPerPage) return null;

  const handlePageChange = (pageNumber) => {
    let newParams = new URLSearchParams(searchParams);

    newParams.set("page", pageNumber);

    setSearchParams(newParams);
  };

  return (
    <div className="flex items-center justify-center gap-1.5 my-12 font-sans selection:bg-transparent">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 border border-mauve-200 bg-white rounded-xl text-mauve-500 hover:text-mauve-900 disabled:opacity-40 disabled:hover:text-mauve-50 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm active:scale-95"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`w-9 h-9 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 flex items-center justify-center
              ${
                isActive
                  ? "bg-mauve-700 text-white font-black scale-105 border border-mauve-800"
                  : "bg-white border border-mauve-200 text-mauve-600 hover:border-mauve-400 hover:text-mauve-900"
              }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 border border-mauve-200 bg-white rounded-xl text-mauve-500 hover:text-mauve-900 disabled:opacity-40 disabled:hover:text-mauve-50 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm active:scale-95"
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default CustomPagination;
