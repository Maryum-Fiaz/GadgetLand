import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap } from "lucide-react";

const TrustMetrics = () => {
  const metrics = [
    {
      icon: <Globe size={20} className="text-mauve-600" />,
      value: "Nationwide",
      label: "Premium Shipping Across Pakistan",
    },
    {
      icon: <Zap size={20} className="text-mauve-600" />,
      value: "99.4%",
      label: "Accuracy Standards",
    },
    {
      icon: <ShieldCheck size={20} className="text-mauve-600" />,
      value: "3 Years",
      label: "Official Warranty Coverage",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-mauve-100 border-b border-mauve-100/60 py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left"
        >
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center md:items-start space-y-3 p-4 rounded-2xl transition-all duration-300 hover:bg-mauve-50/40"
            >
              <div className="w-10 h-10 rounded-xl bg-mauve-50 flex items-center justify-center shadow-xs">
                {item.icon}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-mauve-950 tracking-tight uppercase font-heading">
                  {item.value}
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-mauve-400 leading-normal max-w-50">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustMetrics;
