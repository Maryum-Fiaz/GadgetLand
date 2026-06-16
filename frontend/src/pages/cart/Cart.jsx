import { useDispatch, useSelector } from 'react-redux'
import { MetaData } from '../../components/index'
import { Link, useNavigate } from 'react-router';
import { removeCartItem, setCartItem } from '../../redux/features/cartSlice';
import { Trash } from 'lucide-react';
import { caluclateOrderCost } from '../../helper/helper';


function Cart() {


    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()

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

    // Removing items from cart
    const removeCartItemHandler = (itemId) => {
       dispatch(removeCartItem(itemId))
    }
    
    // Checking out
    const checkoutHandler = () => {
      navigate('/shipping')
    }
    
    const { shippingPrice } = caluclateOrderCost(cartItems);

  return (
    <>
  <MetaData title={"Your Cart"} />
  
  <div className="w-full bg-white min-h-screen font-sans text-zinc-900 antialiased selection:bg-zinc-100 px-4 sm:px-8 py-10 md:py-16">
    <div className="max-w-5xl mx-auto">
      
      {cartItems?.length === 0 ? (
        /* ── EMPTY STATE VIEW ── */
        <div className="text-center py-24 max-w-md mx-auto space-y-5">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Your Cart is Empty</h2>
          <p className="text-sm text-zinc-400">Looks like you haven't added any gear to your collection yet.</p>
          <div className="pt-2">
            <Link to="/products" className="inline-flex h-11 items-center justify-center px-6 bg-mauve-600 hover:bg-mauve-700 text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors shadow-xs">
              Explore Products
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ── HEADER MANIFEST BLOCK ── */}
          <div className="mb-12 border-b border-zinc-100 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Your Cart
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-mono uppercase tracking-wider">
              {cartItems?.length} items selected
            </p>
          </div>

          {/* ── LAYOUT RESPONSIVE GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDEBAR: Active Items Stream */}
            <div className="lg:col-span-7 space-y-4">
              <div className="divide-y divide-zinc-100">
                {cartItems?.map((item) => (
                  <div 
                    key={item?.product} 
                    className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item Identity and Media Segment */}
                    <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                      <img
                        src={item?.image}
                        alt={item?.name || "Product Item"}
                        className="h-14 w-16 object-contain mix-blend-multiply shrink-0"
                      />
                      <div className="min-w-0">
                        <Link 
                          to={`/products/${item?.product}`}
                          className="text-sm font-medium text-zinc-900 hover:text-mauve-600 transition-colors block truncate max-w-[200px] sm:max-w-xs"
                        >
                          {item?.name}
                        </Link>
                        <p className="text-xs font-semibold text-zinc-900 mt-0.5">
                          Rs. {item?.price?.toLocaleString()}/-
                        </p>
                      </div>
                    </div>

                    {/* Quantity Adjustment Controls Strip */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-zinc-100 pt-3 sm:pt-0">
                      
                      {/* Operational Interactive Quantity Counter Module */}
                      <div className="h-9 flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => decreaseQty(item, item.quantity)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded transition-colors cursor-pointer active:scale-90"
                        >
                          —
                        </button>
                        <input
                          type="number"
                          className="w-8 bg-transparent text-center text-xs font-bold text-zinc-800 outline-none select-none"
                          value={item?.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => increaseQty(item, item.quantity)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded transition-colors cursor-pointer active:scale-90"
                        >
                          ＋
                        </button>
                      </div>

                      {/* Trashing Handler Link Trigger */}
                      <button
                        type="button"
                        onClick={() => removeCartItemHandler(item?.product)}
                        className="p-2 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer active:scale-95"
                        title="Remove configuration"
                      >
                        <Trash size={18} strokeWidth={2.2} />
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR: Total Cost Summary Module */}
            <div className="lg:col-span-5 lg:sticky lg:top-12 border border-zinc-200 rounded-xl p-6 sm:p-8 bg-zinc-50/50">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-3 text-sm border-b border-zinc-200 pb-4">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Allocated Volume</span>
                    <span className="font-medium text-zinc-900">
                      {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)} units
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Shipping</span>
                    {shippingPrice === 0 ? (
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Free
                    </span>

                    ) : (
                      <span className="font-medium text-zinc-900">
                      {shippingPrice}
                    </span>
                    )}
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Estimated Total</span>
                  <span className="text-2xl font-black text-zinc-900 tracking-tight">
                    Rs. {cartItems?.reduce((acc, item) => acc + item?.quantity * item.price, 0).toLocaleString()}/-
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={checkoutHandler}
                    className="w-full h-11 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-lg transition-colors flex items-center justify-center shadow-xs cursor-pointer select-none"
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