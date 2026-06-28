import { useEffect } from "react";
import { CustomTable, Loader, MetaData } from "../../components";
import { useAdminOrdersQuery } from "../../redux/api/orderApi"
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";


function ListOrders() {

    const {data, isLoading, error} = useAdminOrdersQuery();

    const orders = data?.orders;


    console.log("data is --> ", orders)
  useEffect(() => {
      if (error) {
        toast.error(error?.data?.message);
      }
  
    }, [error]);
  
    // Define Columns configuration matching your CustomTable requirements
    const tableColumns = [
      { label: "ID", field: "id", align: "left" },
      { label: "Payment Status", field: "paymentStatus", align: "left" },
      { label: "Order Status", field: "orderStatus", align: "left" },
      { label: "Actions", field: "actions", align: "right" },
    ];
  
    // Format the raw backend array to populate rows reactively
    const tableData = data?.orders?.map((order) => {
    const isPaid = order?.paymentInfo?.status?.toUpperCase() === "PAID";
    const isDelivered = order?.orderStatus?.toUpperCase() === "DELIVERED";

    return {
      id: (
        <span className="font-mono text-xs text-zinc-400 select-all">
          {order?._id}
        </span>
      ),
      paymentStatus: (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
          isPaid ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {order?.paymentInfo?.status || 'PENDING'}
        </span>
      ),
      orderStatus: (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
          isDelivered ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
        }`}>
          {order?.orderStatus}
        </span>
      ),
      actions: (
        <div className="flex items-center justify-end gap-2">
        {/* Edit Form Node Link */}
        <Link
          to={`/admin/orders/${order?._id}`}
          className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-blue-200 flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          title="Edit Details"
        >
          <Pencil size={14} />
        </Link>

        {/* Core Purge Trigger Action Button */}
        <button
          type="button"
        //   onClick={() => deleteOrderHandler(product?._id)}
        //   disabled={isDeleteLoading}
          className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center text-zinc-400 hover:text-rose-600 transition-colors disabled:opacity-40 cursor-pointer"
          title="Delete Product"
        >
          <Trash2 size={14} />
        </button>
      </div>
      ),
    };
  }) || [];
  
    if (isLoading) return <Loader />;
  
    return (
      <>
        <MetaData title={"All Inventory Products"} />
  
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tight font-heading">
              Order Database
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              {data?.orders?.length || 0} Orders
            </p>
          </div>
        </div>
  
        {/* Render your exact custom dynamic workspace wrapper table asset */}
        <CustomTable columns={tableColumns} data={tableData} />
      </>
    );
}

export default ListOrders