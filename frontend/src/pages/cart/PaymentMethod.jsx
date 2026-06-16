import { useState } from 'react';
import { MetaData } from '../../components/index'
import CheckoutSteps from './CheckoutSteps'


function PaymentMethod() {

    const [method, setMethod] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if(method === 'COD'){
            // create COD order
            alert('COD')
        }

        if(method === 'Card'){
            // stripe checkout
            alert('Card')
        }
    }

  return (
    <>
  <MetaData title={"Payment Method"} />

  <div className="w-full bg-white min-h-screen font-sans text-zinc-900 antialiased selection:bg-zinc-100 px-4 sm:px-8 py-10 md:py-16">
    <div className="max-w-md mx-auto space-y-12">
      
      {/* ── CENTRALIZED CHECKOUT TIMELINE ── */}
      <CheckoutSteps shipping confirmOrder payment />

      {/* ── PAYMENT METHOD SELECTION FORM ── */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header Block */}
          <div className="border-b border-zinc-100 pb-4">
            <h2 className="text-xl font-black tracking-tight text-zinc-900">
              Payment Method
            </h2>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">
              Select Settlement Option
            </p>
          </div>

          {/* Interactive Radio Choice Stack */}
          <div className="space-y-3">
            
            {/* Cash On Delivery Option Card */}
            <label 
              htmlFor="codradio" 
              className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-lg cursor-pointer transition-all hover:bg-zinc-100/50 has-[:checked]:border-mauve-600 has-[:checked]:bg-white select-none group"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 group-has-[:checked]:text-zinc-950">
                  Cash on Delivery
                </span>
                <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  Pay with cash upon physical shipment arrival
                </span>
              </div>
              <input
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                className="w-4 h-4 accent-mauve-600 cursor-pointer"
                onChange={() => setMethod("COD")}
                required
              />
            </label>

            {/* Credit / Debit Card Option Card */}
            <label 
              htmlFor="cardradio" 
              className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-lg cursor-pointer transition-all hover:bg-zinc-100/50 has-[:checked]:border-mauve-600 has-[:checked]:bg-white select-none group"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 group-has-[:checked]:text-zinc-950">
                  Card Payment
                </span>
                <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  Supports secure VISA, MasterCard configurations
                </span>
              </div>
              <input
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                className="w-4 h-4 accent-mauve-600 cursor-pointer"
                onChange={() => setMethod("Card")}
              />
            </label>

          </div>

          {/* Submission Action Dispatch */}
          <div className="pt-4">
            <button
              id="shipping_btn"
              type="submit"
            //   disabled={isLoading}
              className="w-full h-11 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans text-xs uppercase font-bold tracking-widest rounded-lg transition-colors shadow-xs flex items-center justify-center cursor-pointer select-none active:scale-[0.99]"
            >
              {/* {isLoading ? "Processing..." : "Continue"} */} Continue
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</>
  )
}

export default PaymentMethod