import { useEffect } from "react";
import { useLocation } from "react-router";
import Brands from "../components/homepage/Brands.jsx"
import ProductsSection from "../components/homepage/ProductsSection.jsx"
import TopSelling from "../components/homepage/TopSelling.jsx"
import TrustMetrics from "../components/homepage/TrustMetrics.jsx"
import {Hero, MetaData} from "../components/index.js"
import { useGetTopSellingItemsQuery } from "../redux/api/orderApi.js"
import { motion } from "framer-motion";
import { useGetHomeNewArrivalsQuery } from "../redux/api/productApi.js"

function Home() {

  const {data: topSellingData, error: topSellingError, isLoading: topSellingLoading} = useGetTopSellingItemsQuery();
   const { data: newArrivalData , isLoading: newArrivalLoading } = useGetHomeNewArrivalsQuery();

   const { hash } = useLocation();
   const location = useLocation();

   console.log('url: ', location.pathname) // its showing / no matter whichever i select


   useEffect(() => {
    if (hash) {
      // Remove the '#' to capture target element id
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ block: "start" });
      }
    }
    
  }, [hash, topSellingLoading, newArrivalLoading]);
   
  // loading
  if(topSellingLoading || newArrivalLoading) return (
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

    <div id="top-selling">
    <TopSelling data={topSellingData} error={topSellingError} />
    </div>

    <TrustMetrics />

    <div id="new-arrivals">
    <ProductsSection data={newArrivalData} />
    </div>
    </>
  )
}

export default Home