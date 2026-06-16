import { Link } from "react-router";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    /* max-w-md keeps the steps in a short, elegant central area instead of spreading */
    <div className="w-full max-w-md mx-auto flex items-center justify-between gap-2 py-4 select-none">
      
      {/* ── STEP 1: SHIPPING ── */}
      <div className="flex-1 text-center">
        {shipping ? (
          <Link to="/shipping" className="block group">
            <span className="text-[10px] font-mono font-bold text-mauve-600 tracking-widest block">01</span>
            <span className="text-xs font-bold text-zinc-900 block mt-0.5 whitespace-nowrap">Shipping</span>
            <div className="h-[2px] bg-mauve-600 w-full mt-2" />
          </Link>
        ) : (
          <div className="block opacity-40">
            <span className="text-[10px] font-mono font-medium text-zinc-400 tracking-widest block">01</span>
            <span className="text-xs font-medium text-zinc-400 block mt-0.5 whitespace-nowrap">Shipping</span>
            <div className="h-[2px] bg-zinc-100 w-full mt-2" />
          </div>
        )}
      </div>

      {/* ── STEP 2: CONFIRM ORDER ── */}
      <div className="flex-1 text-center">
        {confirmOrder ? (
          <Link to="/confirm_order" className="block group">
            <span className="text-[10px] font-mono font-bold text-mauve-600 tracking-widest block">02</span>
            <span className="text-xs font-bold text-zinc-900 block mt-0.5 whitespace-nowrap">Confirm</span>
            <div className="h-[2px] bg-mauve-600 w-full mt-2" />
          </Link>
        ) : (
          <div className="block opacity-40">
            <span className="text-[10px] font-mono font-medium text-zinc-400 tracking-widest block">02</span>
            <span className="text-xs font-medium text-zinc-400 block mt-0.5 whitespace-nowrap">Confirm</span>
            <div className="h-[2px] bg-zinc-100 w-full mt-2" />
          </div>
        )}
      </div>

      {/* ── STEP 3: PAYMENT ── */}
      <div className="flex-1 text-center">
        {payment ? (
          <Link to="/payment_method" className="block group">
            <span className="text-[10px] font-mono font-bold text-mauve-600 tracking-widest block">03</span>
            <span className="text-xs font-bold text-zinc-900 block mt-0.5 whitespace-nowrap">Payment</span>
            <div className="h-[2px] bg-mauve-600 w-full mt-2" />
          </Link>
        ) : (
          <div className="block opacity-40">
            <span className="text-[10px] font-mono font-medium text-zinc-400 tracking-widest block">03</span>
            <span className="text-xs font-medium text-zinc-400 block mt-0.5 whitespace-nowrap">Payment</span>
            <div className="h-[2px] bg-zinc-100 w-full mt-2" />
          </div>
        )}
      </div>

    </div>
  );
};

export default CheckoutSteps;