import { useEffect, useState } from 'react';
import { Loader, MetaData, ProductRating } from '../index.js'
import { useGetProductDetailsQuery } from '../../redux/api/productApi.js';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import defaultProduct from '../../assets/defaultProduct.png'

function ProductDetail() {
    const params = useParams()
    const [activeImg, setActiveImg ] = useState(defaultProduct)
    const [quantity, setQuantity] = useState(1)
    
    // fetching product data
    const {data, error, isError, isLoading } = useGetProductDetailsQuery(params?.id)
    const { isAuthenticated } = useSelector(state => state.auth)
    
    const product = data?.product;

    useEffect(() => {
        setActiveImg(product?.images[0] ? product?.images[0].url : defaultProduct)
    }, [product])

    useEffect(() => {
        if (isError) {
            const errorMessage = error?.data?.message || "Failed to fetch product.";
            toast.error(errorMessage);
        }
    }, [isError, error]);
   
    if (isLoading) return <Loader />

    // Quantity increase/decrease
    const increaseQty = () => {
        if(quantity >= product.stock) return;
        setQuantity(prev => prev+1)
    }
    
    const decreaseQty = () => {
        if(quantity <= 1 ) return;
        setQuantity(prev => prev-1)
        
    }


    return (
        <>
            <MetaData title={product?.name} />

            {/* Main Workspace */}
            <div className="w-full bg-zinc-50 min-h-screen font-sans text-zinc-900 antialiased selection:bg-mauve-100 selection:text-mauve-900 px-4 sm:px-6 py-8 md:py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* ── LEFT FRAME: Media Viewer Display Gallery ── */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Hero Image Container - Crisp white card floating softly */}
                        <div className="w-full bg-white border border-zinc-200/80 rounded-4xl p-6 sm:p-12 flex items-center justify-center min-h-85 sm:min-h-115 shadow-xs">
                            <img
                                className="max-h-80 sm:max-h-95 w-auto object-contain"
                                src={activeImg}
                                alt={product?.name}
                            />
                        </div>

                        {/* Synchronized Minimal Thumbnails Strip */}
                        <div className="flex flex-wrap gap-3.5 justify-start px-1">
                            {product?.images?.map((img) => {
                                const isSelected = img.url === activeImg;
                                return (
                                    <button
                                        key={img.url}
                                        type="button"
                                        onClick={() => setActiveImg(img.url)}
                                        className={`h-16 w-16 p-2 bg-white rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer flex items-center justify-center ${
                                            isSelected
                                                ? "border-zinc-800 ring-4 ring-zinc-200/50"
                                                : "border-zinc-200/80 hover:border-zinc-400"
                                        }`}
                                    >
                                        <img
                                            src={img?.url}
                                            alt="Thumbnail asset preview"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── RIGHT FRAME: Clean Details & Actions Panel ── */}
                    <div className="lg:col-span-6 py-2 space-y-6">
                        
                        {/* Header Context Typography */}
                        <div className="space-y-2">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 font-heading leading-tight">
                                {product?.name}
                            </h1>
                            <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-zinc-400">
                                <span>PRODUCT / #{product?._id}</span>
                                <span>•</span>
                                <span className="font-sans font-medium text-zinc-500">Sold by {product?.seller}</span>
                            </div>
                        </div>

                        {/* Ratings Assessment Node */}
                        <div className="flex items-center gap-3 py-1">
                            <ProductRating rating={product?.ratings} numOfReviews={product?.numOfReviews} />
                            <span className="text-xs font-bold text-zinc-400 pt-0.5">
                                ({product?.numOfReviews} Reviews)
                            </span>
                        </div>

                        <hr className="border-zinc-200/80" />

                        {/* Financial Matrix & Stock Metrics Row */}
                        <div className="flex items-baseline justify-between gap-4">
                            <div className="text-zinc-900">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 block mb-0.5">Price</span>
                                <div className="text-3xl font-black">
                                    Rs. <span className="font-sans font-extrabold text-2xl ml-0.5">{product?.price?.toLocaleString()}/-</span>
                                </div>
                            </div>

                            <div>
                                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                                    product?.stock > 0 
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200/60" 
                                        : "bg-rose-50 text-rose-600 border-rose-200/60"
                                }`}>
                                    {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>
                        </div>

                        {/* 🎯 Updated Operational Action Group: Stacks on Mobile, Rows on Desktop */}
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch pt-2">
                            
                            {/* Premium Minimal Quantity Counter Box */}
                            <div className="h-12 flex items-center justify-between sm:justify-start bg-white border border-zinc-200 rounded-xl px-2 shadow-2xs">
                                <button
                                    type="button"
                                    onClick={decreaseQty}
                                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer active:scale-90"
                                >
                                    —
                                </button>
                                <input
                                    type="number"
                                    className="w-12 bg-transparent text-center font-sans text-sm font-bold text-zinc-800 outline-none select-none"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={increaseQty}
                                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 font-bold rounded-lg hover:bg-zinc-50 transition-all cursor-pointer active:scale-90"
                                >
                                    ＋
                                </button>
                            </div>

                            {/* Premium Full-Width Tappable Mauve Button */}
                            <button
                                type="button"
                                disabled={product.stock <= 0}
                                className="flex-1 h-12 p-4 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center active:scale-[0.98]"
                            >
                                Add to Cart
                            </button>
                        </div>

                        <hr className="border-zinc-200/80" />

                        {/* Content Narrative Summary */}
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Technical Details / Specifications</h4>
                            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                                {product?.description}
                            </p>
                        </div>

                        {/* Interactive Customer Review Feedback Canvas Frame */}
                        <div className="pt-2">
                            {isAuthenticated ? (
                                <div className="text-sm font-medium text-zinc-700 bg-white border border-zinc-200 p-4 rounded-xl shadow-2xs">
                                    authentic user review
                                </div>
                            ) : (
                                <div className="bg-white border border-dashed border-zinc-200/80 p-4 rounded-xl text-center">
                                    <p className="text-xs font-medium text-zinc-500">
                                        Want to share feedback?{" "}
                                        <a href="/login" className="text-mauve-600 font-bold hover:underline transition-colors">
                                            Sign in to post an official user review.
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* ── FOOTER FRAME: Multi-User Testimonial Stream ── */}
                {product?.reviews?.length > 0 && (
                    <div className="max-w-6xl mx-auto mt-12 md:mt-20 pt-8 border-t border-zinc-200/80">
                        <div className="text-sm text-zinc-400 font-medium mb-6 uppercase tracking-wider text-[10px]">
                            Verified Customer Evaluations
                        </div>
                        <div className="text-zinc-700">
                            product list
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductDetail;



// import { useEffect, useState } from 'react';
// import { Loader, MetaData, ProductRating } from '../index.js'
// import { useGetProductDetailsQuery } from '../../redux/api/productApi.js';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router';
// import toast from 'react-hot-toast';
// import defaultProduct from '../../assets/defaultProduct.png'


// function ProductDetail() {
    
//     const params = useParams()
    
//     const {data, error, isError, isLoading } = useGetProductDetailsQuery(params?.id)
//     const { isAuthenticated } = useSelector(state => state.auth)
    
//     const product = data?.product;
//     const [activeImg, setActiveImg ] = useState(defaultProduct)


//     useEffect(() => {
//         setActiveImg(product?.images[0] ? product?.images[0].url : defaultProduct)
//     }, [product])

//    useEffect(() => {
//      if (isError) {
       
//        const errorMessage = error?.data?.message || "Failed to fetch product.";
//        toast.error(errorMessage);
//      }
//    }, [isError, error]);
   
   
//      if (isLoading) return <Loader />



//    console.log('data is -> ', data, "  --  product is -> ", product)

//   return (
//     <>
//   <MetaData title={product?.name} />

//   {/* Main Layout Grid Container (Matching GadgetLand's exact page breathing room grid limits) */}
//   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-8 sm:py-14 max-w-6xl mx-auto px-4 font-sans text-zinc-900 antialiased selection:bg-mauve-100 selection:text-mauve-900">
    
//     {/* ── LEFT COLUMN: Media Canvas Area (Spans 6 columns on wide viewport frames) ── */}
//     <div className="lg:col-span-6 space-y-6">
      
//       {/* Primary Hero Interactive Showcase Container (Matching your card image borders perfectly) */}
//       <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 sm:p-10 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[440px]">
//         <img
//           className="w-full max-w-85 h-auto object-contain transition-transform duration-300 hover:scale-105"
//           src={activeImg}
//           alt={product?.name}
//         />
//       </div>

//       {/* Synchronized Structural Thumbnails Matrix Row Layout */}
//       <div className="flex flex-wrap gap-4 justify-start px-1">
//         {product?.images?.map((img) => {
//           const isSelected = img.url === activeImg;
//           return (
//             <button
//               key={img.url}
//               type="button"
//               onClick={() => setActiveImg(img.url)}
//               className={`h-20 w-20 p-2.5 bg-white rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex items-center justify-center ${
//                 isSelected
//                   ? "border-zinc-800 ring-2 ring-zinc-100 shadow-xs"
//                   : "border-zinc-200/80 hover:border-zinc-400"
//               }`}
//             >
//               <img
//                 src={img?.url}
//                 alt="Product thumbnail rendering view"
//                 className="w-full h-full object-contain"
//               />
//             </button>
//           );
//         })}
//       </div>
//     </div>

//     {/* ── RIGHT COLUMN: Architectural Specs Sheet (Spans 6 columns) ── */}
//     <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
      
//       {/* Typography Block Header Node */}
//       <div className="space-y-3">
//         <div>
//           <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading leading-tight">
//             {product?.name}
//           </h1>
//           <p className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase mt-1">
//             Product Code / #{product?._id}
//           </p>
//         </div>

//         {/* Ratings Feedback Core Alignment Module */}
//         <div className="flex items-center gap-3">
//           <ProductRating rating={product?.ratings} numOfReviews={product?.numOfReviews} />
//           <span className="text-xs font-bold text-zinc-400 pt-0.5">
//             ({product?.numOfReviews} Reviews)
//           </span>
//         </div>

//         <div className="border-b border-zinc-200/60 pt-1" />
//       </div>

//       {/* Operational Core Settings Box (Handles Price layout matching your screenshot cards) */}
//       <div className="space-y-5">
        
//         {/* Dual pricing display status label block row */}
//         <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200/60 p-4 rounded-2xl">
//           <div className="space-y-0.5">
//             <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Retail Value</span>
//             <div className="text-2xl font-black text-zinc-900">
//               Rs. <span className="font-sans font-extrabold text-xl ml-0.5">{product?.price?.toLocaleString()}/-</span>
//             </div>
//           </div>
          
//           {/* Availability System Tag Badge */}
//           <div className="text-right">
//             <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 block mb-1">Status</span>
//             <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg border ${
//               product?.stock > 0 
//                 ? "bg-emerald-50 text-emerald-700 border-emerald-200/60" 
//                 : "bg-rose-50 text-rose-600 border-rose-200/60"
//             }`}>
//               {product?.stock > 0 ? "In Stock" : "Out of Stock"}
//             </span>
//           </div>
//         </div>

//         {/* Cart Interaction Counter & Dispatch Action Hub Layout Row */}
//         <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          
//           {/* Minimal Custom Counter Box Wrapper Layout */}
//           <div className="h-12 flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-1">
//             <button
//               type="button"
//             //   onClick={decreaseQty}
//               className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 font-extrabold rounded-xl hover:bg-white transition-all cursor-pointer active:scale-90"
//             >
//               —
//             </button>
//             <input
//               type="number"
//               className="w-12 bg-transparent text-center font-sans text-sm font-black text-zinc-800 outline-none select-none"
//             //   value={quantity}
//               readOnly
//             />
//             <button
//               type="button"
//             //   onClick={increaseQty}
//               className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 font-extrabold rounded-xl hover:bg-white transition-all cursor-pointer active:scale-90"
//             >
//               ＋
//             </button>
//           </div>

//           {/* Primary Action Button (Matching your custom Dark Mauve / Charcoal header button weights) */}
//           <button
//             type="button"
//             disabled={product.stock <= 0}
//             // onClick={setItemToCart}
//             className="flex-1 h-12 bg-zinc-800 hover:bg-zinc-900 active:bg-black text-white font-sans text-xs uppercase font-bold tracking-widest rounded-2xl transition-all shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center active:scale-[0.98]"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Information Specification Block */}
//       <div className="space-y-2 pt-2">
//         <div className="border-b border-zinc-200/60 pb-1" />
//         <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Technical Parameters</h4>
//         <p className="text-sm text-zinc-600 leading-relaxed font-medium">
//           {product?.description}
//         </p>
//         <div className="pt-2 text-xs text-zinc-400 font-medium">
//           Official Provider: <strong className="text-zinc-700 ml-0.5">{product?.seller}</strong>
//         </div>
//       </div>

//       {/* Review Authentication Authorization Guard Box */}
//       <div className="pt-4">
//         {isAuthenticated ? (
//           <span> authentic user review</span>
//         ) : (
//           <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-center">
//             <p className="text-xs font-bold text-zinc-500">
//               Want to share feedback?{" "}
//               <a href="/login" className="text-zinc-800 underline transition-colors hover:text-zinc-900">
//                 Sign in to post an official user review.
//               </a>
//             </p>
//           </div>
//         )}
//       </div>

//     </div>
//   </div>

//   {/* ── FOOTER LAYER CANVAS: Composite Aggregate Evaluations ── */}
//   {product?.reviews?.length > 0 && (
//     <div className="max-w-6xl mx-auto px-4 pb-20">
//       <div className="border-t border-zinc-200/60 pt-10">
//        product list
//       </div>
//     </div>
//   )}
// </>
//   )
// }

// export default ProductDetail