import { useState, useEffect } from "react";
import { Loader, MetaData, SalesChart } from "../../components/index.js";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi.js";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AdminDashboard() {

    const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, {isLoading, error, data}] = useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if(error) {
      toast.error(error?.data?.message);
    }

    if(startDate && endDate && !data){
      getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
    }


  }, [error, data, startDate, endDate, getDashboardSales])

    const handleSubmit = () => {
      getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
    }
    
    if(isLoading) return <Loader />;

  return (
    <>
  <MetaData title={"Admin Dashboard"} />

  <div className="w-full bg-white font-sans text-zinc-900 antialiased px-1 py-4">
    

    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-10">
      
      {/* Heading */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-100 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
            Sales Insights
          </h1>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">
            Temporal Performance Tracking
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          
          {/* Start Date Field */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              Start Date
            </label>

            <div className="relative z-20 [&>.react-datepicker-wrapper]:w-full [&>.react-datepicker__popper]:z-20 [&>.react-datepicker]:bg-white [&>.react-datepicker]:border-zinc-200 [&>.react-datepicker]:shadow-xl [&>.react-datepicker]:rounded-xl [&>.react-datepicker]:font-sans">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-40 h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-mauve-600 focus:ring-4 focus:ring-zinc-100"
              />
            </div>
          </div>

          {/* End Date Field */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              End Date
            </label>
            <div className="relative z-20 [&>.react-datepicker-wrapper]:w-full [&>.react-datepicker__popper]:z-20 [&>.react-datepicker]:bg-white [&>.react-datepicker]:border-zinc-200 [&>.react-datepicker]:shadow-xl [&>.react-datepicker]:rounded-xl [&>.react-datepicker]:font-sans">
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="w-40 h-10 px-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 outline-none transition-all focus:bg-white focus:border-mauve-600 focus:ring-4 focus:ring-zinc-100"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 px-6 lg:mt-5 bg-mauve-600 hover:bg-mauve-700 active:bg-mauve-800 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-lg transition-all cursor-pointer select-none active:scale-[0.98] shadow-xs"
          >
            Fetch
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Revenue Display Box */}
        <div className="bg-zinc-50/60 border border-zinc-200/60 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-30">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] block">
              Gross Revenue
            </span>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight font-mono mt-2">
              Rs. {data?.totalSales?.toFixed(2)}
            </h3>
          </div>
          <div className="absolute top-0 right-0 w-1 h-full bg-mauve-600" />
        </div>

        {/* Order Volumes Box */}
        <div className="bg-zinc-50/60 border border-zinc-200/60 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-30">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b5cf6] block">
              Processed Volume
            </span>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tight font-mono mt-2">
              {data?.totalNumOfOrders}
              <span className="text-xs font-sans font-bold text-zinc-400 uppercase tracking-wider ml-1.5">Orders</span>
            </h3>
          </div>
          <div className="absolute top-0 right-0 w-1 h-full bg-zinc-900" />
        </div>

      </div>

      {/* Chart */}
      <div className="w-full h-80 sm:h-96 bg-white border border-zinc-200/80 rounded-xl p-4">
        <SalesChart salesData={data?.sales} />
      </div>

    </div>
  </div>
</>
  )
}

export default AdminDashboard