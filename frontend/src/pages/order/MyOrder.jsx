import { Container, CustomTable, Loader, MetaData } from "../../components";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import { Link, useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Printer } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const MyOrder = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");
  console.log('data on MyOrder.jsx: ', data);
  

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess, navigate, dispatch]);

  const columns = [
    { label: "ID", field: "id" },
    { label: "Amount", field: "amount" },
    { label: "Payment Status", field: "status" },
    { label: "Order Status", field: "orderStatus" },
    { label: "Actions", field: "actions", align: "right" },
  ];

  const tableData =
    data?.orders?.map((order) => {
      const isPaid = order?.paymentInfo?.status?.toUpperCase() === "PAID";
      const isDelivered = order?.orderStatus?.toUpperCase() === "DELIVERED";

      return {
        id: (
          <span className="font-mono text-xs text-zinc-400 select-all">
            {order?._id}
          </span>
        ),
        amount: (
          <span className="font-mono font-bold text-zinc-800">
            Rs.{" "}
            {order?.totalAmount?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
        status: (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
              isPaid
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {order?.paymentInfo?.status || "PENDING"}
          </span>
        ),
        orderStatus: (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
              isDelivered
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-600 border border-zinc-200"
            }`}
          >
            {order?.orderStatus}
          </span>
        ),
        actions: (
          <div className="inline-flex items-center gap-1.5 justify-end">
            <Link
              to={`/me/order/${order?._id}`}
              className="px-3 h-8 inline-flex items-center text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all shadow-xs"
            >
              View Details
            </Link>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="p-2 text-zinc-400 hover:text-mauve-600 hover:bg-zinc-100 rounded-lg transition-all"
              title="Print Invoice"
            >
              <Printer size={18} strokeWidth={2.5} />
            </Link>
          </div>
        ),
      };
    }) || [];

  if (isLoading) return <Loader />;

  return (
    <Container>
      <div className="w-full font-sans text-zinc-900 antialiased py-4 h-screen">
        <MetaData title={"My Orders"} />

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
            {data?.orders?.length || 0} Orders
          </h1>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1">
            Personal Order History Records
          </p>
        </div>

        {/* Custom Table Component */}
        <CustomTable columns={columns} data={tableData} />
      </div>
    </Container>
  );
};

export default MyOrder;
