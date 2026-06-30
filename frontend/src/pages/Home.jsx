import Brands from "../components/homepage/Brands.jsx"
import TopSelling from "../components/homepage/TopSelling.jsx"
import TrustMetrics from "../components/homepage/TrustMetrics.jsx"
import {Hero, MetaData} from "../components/index.js"


function Home() {
  return (
    <>
    <MetaData title='Buy Best Gadgets' />
    <Hero />
    <Brands />
    <TopSelling />
    <TrustMetrics />
    </>
  )
}

export default Home