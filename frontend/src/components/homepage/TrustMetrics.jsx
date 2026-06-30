import { motion } from "framer-motion";

const TrustMetrics = () => {
  const metrics = [
    { value: "99.4%", label: "Sound Accuracy" },
    { value: "Global", label: "Priority Shipping" },
    { value: "3 Years", label: "Full Warranty" },
  ];

  return (
    <section className="w-full bg-white border-b border-zinc-100 py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Staggered container fade-in effect on scroll */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center"
        >
          {metrics.map((item, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="space-y-1"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono tracking-tight">
                {item.value}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TrustMetrics;