import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '../../components/index'
import { Link } from 'react-router';
import { removeCartItem, setCartItem } from '../../redux/features/cartSlice';
import { Trash } from 'lucide-react';


function Cart() {


    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    // Quantity increase/decrease
        const increaseQty = (item, quantity) => {
            
            const newQty = quantity + 1;
            if(newQty >= item?.stock) return;

            setItemToCart(item, newQty)
            console.log('increaseQty ', item);

        }
        
        const decreaseQty = (item, quantity) => {
            const newQty = quantity - 1;
            if(newQty <= 0 ) return;

            setItemToCart(item, newQty)
            console.log('decreaseQty ', item);
            
            
        }
    
        // Adding item to cart
        const setItemToCart = (item, newQty) => {
        const cartItem = {
          product: item?.product,
          name: item?.name,
          price: item?.price,
          image: item?.image,
          stock: item?.stock,
          quantity: newQty,
        };
    
        dispatch(setCartItem(cartItem))
    }

    const removeCartItemHandler = (itemId) => {
       dispatch(removeCartItem(itemId))
    }
    

  return (
    <>
  <MetaData title={"Your Cart"} />
  
  <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased selection:bg-mauve-100 selection:text-mauve-900 px-4 sm:px-6 py-10 md:py-16">
    <div className="max-w-6xl mx-auto">
      
      {cartItems?.length === 0 ? (
        /* Empty State Screen View */
        <div className="text-center py-24 bg-white border border-zinc-200/80 rounded-4xl p-8 shadow-2xs max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-zinc-800">Your Cart is Empty</h2>
          <p className="text-sm text-zinc-400">Looks like you haven't added any premium tech gear to your collection yet.</p>
          <div className="pt-2">
            <Link to="/products" className="inline-flex h-11 items-center justify-center px-6 bg-zinc-900 hover:bg-zinc-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-xs">
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Section Dynamic Heading Block */}
          <div className="mb-10">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Your Cart
            </h1>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mt-1">
              Reviewing <span className="text-mauve-600 font-bold">{cartItems?.length} selected items</span>
            </p>
          </div>

          {/* Core Master Grid Workspace Layout Splitting Item List and Checkout Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* ── LEFT CANVAS: Continuous Responsive List of Cart Items ── */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems?.map((item) => (
                <div 
                  key={item?.product} 
                  className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs transition-all hover:border-zinc-300"
                >
                  {/* Dynamic Inner Layout Flexbox Grid: Completely custom matching image/text ratios */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Visual & Text Identity Wrapper Block */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {/* Product Thumbnail Shell Frame Container */}
                      <div className="h-20 w-20 sm:h-24 sm:w-24 bg-zinc-50 border border-zinc-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                        <img
                          src={item?.image}
                          alt={item?.name || "Product Item"}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>
                      
                      {/* Typographic Metadata Container Node */}
                      <div className="space-y-1 min-w-0">
                        <Link 
                          to={`/products/${item?.product}`}
                          className="text-sm font-extrabold text-zinc-800 hover:text-mauve-600 transition-colors block leading-snug truncate max-w-[220px] sm:max-w-sm"
                        >
                          {item?.name}
                        </Link>
                        <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                          MSRP Item Unit Price
                        </p>
                      </div>
                    </div>

                    {/* Operational Interactions Controller Strip (Responsive spacing ensures layout alignment) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-zinc-100 pt-3 sm:pt-0">
                      
                      {/* Responsive Dynamic Unit Value Calculation Node */}
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-bold text-zinc-400 block sm:hidden uppercase tracking-wider mb-0.5">Price</span>
                        <p className="text-base font-black text-zinc-900">
                          Rs. {item?.price?.toLocaleString()}/-
                        </p>
                      </div>

                      {/* Minimal Custom Counter Box Container Module */}
                      <div className="h-10 flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-1">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item, item.quantity)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-white transition-all cursor-pointer active:scale-90"
                        >
                          —
                        </button>
                        <input
                          type="number"
                          className="w-10 bg-transparent text-center font-sans text-xs font-bold text-zinc-800 outline-none select-none"
                          value={item?.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => increaseQty(item, item.quantity)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-white transition-all cursor-pointer active:scale-90"
                        >
                          ＋
                        </button>
                      </div>

                      {/* Quiet Functional Trashing Overlay Control Icon */}
                      <button
                        type="button"
                        onClick={() => removeCartItemHandler(item?.product)}
                        className="p-2.5 text-zinc-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer active:scale-95"
                        title="Remove item configuration"
                      >
                        <Trash size={20} strokeWidth={2.2} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT CANVAS: Order Summary Sidebar Card ── */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-zinc-200/80 rounded-[2rem] p-6 shadow-2xs space-y-5 sticky top-28">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                  Order Summary
                </h3>
                
                <div className="border-b border-zinc-100 pb-1" />

                {/* Computational Metric Rows Stack */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-500">Allocated Units</span>
                    <span className="font-mono font-bold text-zinc-800">
                      {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)} items
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-500">Est. Shipping Taxes</span>
                    <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      Gratis / Free
                    </span>
                  </div>

                  <div className="border-b border-dashed border-zinc-200 pt-1" />

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Estimated Total</span>
                    <div className="text-2xl font-black text-zinc-900">
                      Rs. <span className="font-sans font-extrabold text-xl ml-0.5">
                        {cartItems?.reduce((acc, item) => acc + item?.quantity * item.price, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/-
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {/* Master Checkout Redirect Button Trigger */}
                  <button
                    type="button"
                    // onClick={checkoutHandler}
                    className="w-full h-12 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  </div>
</>
  )
}

export default Cart