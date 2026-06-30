import { motion } from "framer-motion";

const Brands = () => {
  const brands = ["SONY", "APPLE", "LOGITECH", "RAZER", "BOSE", "SENNHEISER"];

  return (
    <section className="w-full bg-mauve-50/30 py-10 border-b border-mauve-100 overflow-hidden relative">
      
      {/* Side fades using your native mauve tint */}
      <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-mauve-50/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-mauve-50/50 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div 
          className="flex gap-20 items-center pr-20"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
          }}
        >
          {/* Loop 1 */}
          {brands.map((brand, i) => (
            <span 
              key={`first-${i}`} 
              className="text-xs font-heading font-black tracking-widest text-mauve-400 uppercase select-none"
            >
              {brand}
            </span>
          ))}

          {/* Loop 2 */}
          {brands.map((brand, i) => (
            <span 
              key={`second-${i}`} 
              className="text-xs font-heading font-black tracking-widest text-mauve-400 uppercase select-none"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;