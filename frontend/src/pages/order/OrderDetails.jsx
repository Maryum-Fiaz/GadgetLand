import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Loader, MetaData } from "../../components";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
    createdAt,
    paymentMethod,
  } = order;

  const isPaid = paymentInfo?.status?.toLowerCase() === "paid";
  const isDelivered = orderStatus?.toUpperCase() === "DELIVERED";

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-zinc-50/50 py-12 px-4 sm:px-6">
      <MetaData title={"Order Details"} />

      <div className="max-w-5xl mx-auto bg-white border border-zinc-200/60 rounded-2xl shadow-xs p-6 sm:p-10 text-zinc-700 font-sans antialiased">
        {/* HEADING */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-zinc-100 pb-6 mb-8">
          <div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
              Order Receipt
            </h1>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Document #{order?._id?.substring(0, 8).toUpperCase()}
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1 select-all">
              Full ID: {order?._id}
            </p>
          </div>

          <Link
            to={`/invoice/order/${order?._id}`}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all shadow-2xs self-start sm:self-auto"
          >
            <svg
              className="w-3.5 h-3.5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.82l-.24 2.13A1 1 0 007.47 17h9.06a1 1 0 00.99-1.05l-.24-2.13m-10.56 0A1.75 1.75 0 015 12.25V9.5a1.75 1.75 0 011.75-1.75h10.5a1.75 1.75 0 011.75 1.75v2.75a1.75 1.75 0 01-1.72 1.57m-10.56 0h10.56M16.5 7.5V5.25a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 007.5 5.25V7.5m9 0h-9m1.5 4.5h.008v.008h-.008v-.008zm3 0h.008v.008h-.008v-.008z"
              />
            </svg>
            Print Invoice
          </Link>
        </div>

        {/* METADATA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-8 border-b border-zinc-100">
          {/* SHIPPING BLOCK */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Shipping Information
            </h3>
            <div className="space-y-1 text-sm text-zinc-600">
              <div className="flex gap-2 text-zinc-400 text-xs">
                <span className="w-16 font-mono shrink-0">Name:</span>
                <span className="font-bold text-zinc-800">
                  {user?.name || "Customer"}
                </span>
              </div>
              <div className="flex gap-2 text-zinc-400 text-xs">
                <span className="w-16 font-mono shrink-0">Phone:</span>
                <span className="text-zinc-700">{shippingInfo?.phoneNo}</span>
              </div>
              <div className="flex gap-2 text-zinc-400 text-xs items-start">
                <span className="w-16 font-mono shrink-0">Address:</span>
                <span className="text-zinc-600 leading-relaxed">
                  {shippingInfo?.address}, {shippingInfo?.city},{" "}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT BLOCK */}
          <div className="space-y-4 md:border-l md:border-zinc-100 md:pl-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Fulfillment Summary
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-mono">Placed On:</span>
                <span className="font-medium text-zinc-700">
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-mono">Method:</span>
                <span className="font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  {paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-mono">Status:</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${
                    isPaid
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}
                >
                  {paymentInfo?.status || "PENDING"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 font-mono">Order State:</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    isDelivered
                      ? "bg-zinc-900 text-white"
                      : "bg-mauve-50 text-mauve-700 border border-mauve-100"
                  }`}
                >
                  {orderStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono mb-4">
            Items Ordered ({orderItems?.length || 0})
          </h3>

          <div className="divide-y divide-zinc-100 border-t border-b border-zinc-100 mb-6">
            {orderItems?.map((item) => (
              <div
                key={item?.product}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-4 last:pb-4"
              >
                {/* Product */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-14 h-14 object-cover rounded-xl border border-zinc-100 bg-zinc-50/50 shrink-0 p-0.5"
                  />
                  <div className="space-y-0.5">
                    <Link
                      to={`/product/${item?.product}`}
                      className="text-xs font-bold text-zinc-800 hover:text-mauve-600 transition-colors line-clamp-1 leading-snug"
                    >
                      {item?.name}
                    </Link>
                    <p className="text-[11px] font-mono text-zinc-400">
                      1 × Rs.{" "}
                      {item?.price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                {/* Sub-total output calculations */}
                <div className="flex items-center justify-between sm:justify-end gap-12 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-50">
                  <div className="sm:text-right">
                    <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      Quantity
                    </p>
                    <p className="text-xs font-bold text-zinc-800 mt-0.5">
                      {item?.quantity}{" "}
                      {item?.quantity === 1 ? "Piece" : "Pieces"}
                    </p>
                  </div>
                  <div className="text-right min-w-25">
                    <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      Total Price
                    </p>
                    <p className="text-xs font-mono font-bold text-zinc-950 mt-0.5">
                      Rs.{" "}
                      {(item?.price * item?.quantity)?.toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2 },
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FINAL TRANSACTION BALANCE */}
          <div className="flex flex-col items-end gap-1.5 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Total Due Paid
            </span>
            <span className="text-xl font-black text-zinc-950 font-mono tracking-tight">
              Rs.{" "}
              {totalAmount?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
