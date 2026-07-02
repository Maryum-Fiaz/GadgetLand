import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[90vh] flex flex-col justify-center items-center px-4 text-white overflow-hidden bg-mauve-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/images/hero2.jpg"
          alt="Premium Workspace Setup"
          className="w-full h-full object-cover object-center pointer-events-none"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* mauve gradient over it */}
        <div className="absolute inset-0 bg-linear-to-b from-mauve-950/60 via-transparent to-mauve-950/95" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        {/* text center */}
        <div className="space-y-0">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none font-heading"
          >
            PREMIUM
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-transparent stroke-text font-serif italic lowercase font-normal block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal"
          >
            ecosystem.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs sm:text-sm text-mauve-100 font-light max-w-sm sm:max-w-md mx-auto leading-relaxed tracking-wide"
        >
          Hand-selected laptops, custom mechanical keyboards, high-performance
          power tools, and premium audio instruments engineered for pure
          creative performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate("/products")}
            className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-mauve-50 text-mauve-950 text-[11px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-sm"
          >
            Buy Now
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
          color: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
