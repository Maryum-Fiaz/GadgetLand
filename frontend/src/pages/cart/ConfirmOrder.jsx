import { useSelector } from 'react-redux';
import { MetaData } from '../../components/index'
import { Link } from 'react-router'
import { caluclateOrderCost } from '../../helper/helper';
import CheckoutSteps from './CheckoutSteps';


function ConfirmOrder() {

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  return (
    <>
  <MetaData title={"Confirm Order Info"} />
  
  <div className="w-full bg-white min-h-screen font-sans text-zinc-900 antialiased selection:bg-zinc-100 px-4 sm:px-8 py-10 md:py-16">
    <div className="max-w-5xl mx-auto">
      
      {/* ── STEPS TIMELINE WRAPPER ── */}
      <div className="w-full mb-12">
        <CheckoutSteps shipping confirmOrder />
      </div>

      {/* ── MAIN WORKSPACE GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Shipping details & Cart Manifest */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* SHIPPING OVERVIEW */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Shipping Info
            </h2>
            
            <div className="space-y-2 text-sm text-zinc-700">
              <p><span className="text-zinc-400 inline-block w-20">Name:</span> <strong className="text-zinc-900 font-semibold">{user?.name}</strong></p>
              <p><span className="text-zinc-400 inline-block w-20">Phone:</span> <span className="font-mono">{shippingInfo?.phoneNo}</span></p>
              <p className="flex items-start"><span className="text-zinc-400 inline-block w-20 shrink-0">Address:</span> <span className="text-zinc-600">{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}</span></p>
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* CART ITEMS LIST */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Your Cart Items
            </h2>

            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div 
                  key={item?.product}
                  className="flex items-center justify-between gap-4 py-2"
                >
                  {/* Media Object Core Layout */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={item?.image}
                      alt={item?.name || "Product Item"}
                      className="h-12 w-16 object-contain mix-blend-multiply shrink-0"
                    />
                    
                    <div className="min-w-0">
                      <Link 
                        to={`/products/${item.product}`}
                        className="text-sm font-medium text-zinc-900 hover:text-mauve-600 transition-colors block truncate max-w-[180px] sm:max-w-xs"
                      >
                        {item?.name}
                      </Link>
                      <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                        {item?.quantity} x Rs. {item?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Node */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-zinc-900">
                      Rs. {(item?.quantity * item.price)?.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Minimal Order Calculator Stick */}
        <div className="lg:col-span-5 lg:sticky lg:top-12 border border-zinc-200 rounded-xl p-6 sm:p-8 bg-zinc-50/50">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
              Order Summary
            </h3>
            
            <div className="space-y-3 text-sm border-b border-zinc-200 pb-4">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">Rs. {itemsPrice?.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between text-zinc-600">
                <span>Shipping</span>
                <span className="font-medium text-zinc-900">Rs. {shippingPrice?.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-600">
                <span>Tax</span>
                <span className="font-medium text-zinc-900">Rs. {taxPrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Due</span>
              <span className="text-2xl font-black text-zinc-900 tracking-tight">
                Rs. {totalPrice?.toLocaleString()}/-
              </span>
            </div>

            <div className="pt-4">
              <Link
                to="/payment_method"
                id="checkout_btn"
                className="w-full h-11 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-lg transition-colors flex items-center justify-center shadow-xs select-none cursor-pointer"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</>
  )
}

export default ConfirmOrder