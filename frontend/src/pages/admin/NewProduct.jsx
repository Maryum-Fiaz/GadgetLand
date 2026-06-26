import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCreateProductMutation } from "../../redux/api/productApi";
import { MetaData } from "../../components";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: PRODUCT_CATEGORIES?.[0] || "", // Sets safe default value node
    stock: "",
    seller: "",
  });

  const { name, description, price, category, stock, seller } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <>
      <MetaData title={"Create New Product"} />

      {/* Main Core Layout Form Grid Wrapper */}
      <div className="w-full max-w-3xl mx-auto px-2 py-6 font-sans selection:bg-mauve-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header Typography Group */}
          <div className="space-y-1 pb-4 border-b border-zinc-100">
            <h2 className="text-xl font-black text-zinc-900 tracking-tight">
              Create New Product
            </h2>
            <p className="text-xs font-medium text-zinc-400">
              Deploy a new item record node to your global catalog ecosystem.
            </p>
          </div>

          {/* Product Name Input Field */}
          <div className="space-y-1.5">
            <label htmlFor="name_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Product Title
            </label>
            <input
              type="text"
              id="name_field"
              name="name"
              placeholder="e.g., Mechanical Cyber Keyboard"
              value={name}
              onChange={onChange}
              className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
              required
            />
          </div>

          {/* Description Block */}
          <div className="space-y-1.5">
            <label htmlFor="description_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Detailed Specifications
            </label>
            <textarea
              id="description_field"
              name="description"
              rows="6"
              placeholder="Provide clean technical data statements and specifications..."
              value={description}
              onChange={onChange}
              className="w-full p-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100 resize-none leading-relaxed"
              required
            ></textarea>
          </div>

          {/* Price & Stock Twin Split Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price Field */}
            <div className="space-y-1.5">
              <label htmlFor="price_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Price (Rs.)
              </label>
              <input
                type="number"
                id="price_field"
                name="price"
                placeholder="0.00"
                value={price}
                onChange={onChange}
                className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
                required
              />
            </div>

            {/* Stock Field */}
            <div className="space-y-1.5">
              <label htmlFor="stock_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Available Stock Units
              </label>
              <input
                type="number"
                id="stock_field"
                name="stock"
                placeholder="e.g., 50"
                value={stock}
                onChange={onChange}
                className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
                required
              />
            </div>
          </div>

          {/* Category Selection & Seller Twin Split Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Dynamic Category Selector */}
            <div className="space-y-1.5">
              <label htmlFor="category_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Product Category
              </label>
              <div className="relative">
                <select
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                  className="w-full h-11 px-4 pr-10 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100 appearance-none cursor-pointer"
                >
                  {PRODUCT_CATEGORIES?.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Minimal Custom Dropdown Arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Seller Asset Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="seller_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Vendor / Seller Name
              </label>
              <input
                type="text"
                id="seller_field"
                name="seller"
                placeholder="e.g., GadgetLand Express"
                value={seller}
                onChange={onChange}
                className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
                required
              />
            </div>
          </div>

          {/* Action Trigger Buttons Group */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-44 h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-xs disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isLoading ? "Creating record..." : "CREATE PRODUCT"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default NewProduct;