import Brands from "../components/homepage/Brands.jsx"
import TopSelling from "../components/homepage/TopSelling.jsx"
import TrustMetrics from "../components/homepage/TrustMetrics.jsx"
import {Hero, MetaData} from "../components/index.js"
import { useGetTopSellingItemsQuery } from "../redux/api/orderApi.js"
import { motion } from "framer-motion";

function Home() {

  const {data: topSellingData, error: topSellingError, isLoading: topSellingLoading} = useGetTopSellingItemsQuery();

  if(topSellingLoading) return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-white selection:bg-mauve-100">
  <motion.p 
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="text-xs sm:text-sm font-heading font-black tracking-[0.2em] text-mauve-600 uppercase text-center select-none"
  >
    Gadget Land Loading ...
  </motion.p>
</div>
  )

  return (
    <>
    <MetaData title='Gadget Land' />
    <Hero />
    <Brands />
    <TopSelling data={topSellingData} error={topSellingError} />
    <TrustMetrics />
    </>
  )
}

export default Home