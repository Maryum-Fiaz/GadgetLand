import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] flex flex-col justify-center items-center px-4 text-white overflow-hidden bg-mauve-950">
      
      {/* Background Flagship Image with Framer Motion subtle zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80" 
          alt="Sony WH-1000XM5 Featured Product" 
          className="w-full h-full object-cover object-center pointer-events-none"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Using native Tailwind mauve gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-mauve-950/60 via-transparent to-mauve-950/95" />
      </div>

      {/* Center Layout Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 flex flex-col items-center">
        
        {/* Top Micro-Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mauve-400 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-mauve-200">
            Featured Premium Tech
          </span>
        </motion.div>

        {/* Centerpiece Text using Syne typography */}
        <div className="space-y-0">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none font-heading"
          >
            Acoustic
          </motion.h1>
          
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-transparent stroke-text font-serif italic lowercase font-normal block text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal"
          >
            architecture.
          </motion.span>
        </div>
        
        {/* Minimal Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs sm:text-sm text-mauve-100 font-light max-w-sm sm:max-w-md mx-auto leading-relaxed tracking-wide"
        >
          Discover pure sound design with the Sony WH-1000XM5. Engineered for extreme sound accuracy and high-end focus.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto h-11 px-6 bg-white hover:bg-mauve-50 text-mauve-950 text-[11px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-sm">
            Buy Now
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          
          <button className="w-full sm:w-auto h-11 px-6 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-[11px] uppercase font-bold tracking-widest rounded-xl border border-white/10 transition-all cursor-pointer flex items-center justify-center">
            View Details
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