import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { Link, useParams } from "react-router";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { Loader, MetaData } from "../../components";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const { data, isLoading } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "Paid";

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order updated");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Process Order"} />

      <div className="w-full max-w-6xl mx-auto px-4 py-6 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* Order details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-800 tracking-tight font-heading">
                Order Details
              </h3>
              <div className="border border-zinc-200/60 rounded-xl bg-white p-4 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Order ID
                  </span>
                  <span className="font-mono text-zinc-700 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                    {order?._id}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Order Status
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${
                      String(orderStatus).includes("Delivered")
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {orderStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Area */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-800 tracking-tight font-heading">
                Shipping Info
              </h3>
              <div className="border border-zinc-200/60 rounded-xl bg-white p-4 space-y-3 shadow-xs text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Customer Name
                  </span>
                  <span className="font-medium text-zinc-800">
                    {user?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Phone No
                  </span>
                  <span className="font-medium text-zinc-700">
                    {shippingInfo?.phoneNo}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Delivery Address
                  </span>
                  <span className="font-medium text-zinc-600 sm:text-right max-w-md">
                    {shippingInfo?.address}, {shippingInfo?.city},{" "}
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-800 tracking-tight font-heading">
                Payment Info
              </h3>
              <div className="border border-zinc-200/60 rounded-xl bg-white p-4 space-y-3 shadow-xs text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Payment Status
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {paymentInfo?.status}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Method Gateway
                  </span>
                  <span className="font-medium text-zinc-700 uppercase tracking-wide">
                    {order?.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider">
                    Transaction ID
                  </span>
                  <span className="font-mono text-zinc-600 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                    {paymentInfo?.id || "Nill"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
                  <span className="font-bold text-zinc-400 uppercase tracking-wider text-sm">
                    Total Settlement Amount
                  </span>
                  <span className="text-sm font-black text-zinc-900 font-mono">
                    ${totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items Queue */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-zinc-800 tracking-tight font-heading">
                Order Items
              </h3>
              <div className="border border-zinc-200/60 rounded-xl bg-white divide-y divide-zinc-100 shadow-xs overflow-hidden">
                {orderItems?.map((item) => (
                  <div
                    key={item?.product}
                    className="flex items-center justify-between p-4 gap-4 hover:bg-zinc-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-zinc-50 rounded-lg border border-zinc-200/60 p-1 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <Link
                          to={`/products/${item?.product}`}
                          className="text-xs font-bold text-zinc-800 hover:text-mauve-600 transition-colors line-clamp-1"
                        >
                          {item?.name}
                        </Link>
                        <p className="text-[10px] font-medium text-zinc-400 font-mono">
                          ID: {item?.product}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-right shrink-0">
                      <p className="font-mono text-zinc-500">${item?.price}</p>
                      <p className="font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded text-[11px]">
                        {item?.quantity} Pcs
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6 lg:top-6">
            <div className="border border-zinc-200/60 bg-white rounded-xl p-5 shadow-xs space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Update Logistics
                </h4>
                <div className="relative">
                  <select
                    className="w-full h-10 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all appearance-none cursor-pointer"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>

                <button
                  className="w-full h-10 bg-mauve-500 hover:bg-mauve-600 text-white text-xs uppercase font-bold tracking-widest rounded-lg transition-colors shadow-xs cursor-pointer"
                  onClick={() => updateOrderHandler(order?._id)}
                >
                  Update Status
                </button>
              </div>

              <div className="border-t border-zinc-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Print Operations
                </h4>
                <Link
                  to={`/invoice/order/${order?._id}`}
                  className="w-full h-10 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs uppercase font-bold tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Printer size={14} strokeWidth={2} />
                  Generate Invoice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
