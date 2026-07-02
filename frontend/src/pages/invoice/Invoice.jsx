import { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { Loader, MetaData } from "../../components";
import { Download } from "lucide-react";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const { shippingInfo, orderItems, paymentInfo, user } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownload = () => {
    const input = document.getElementById("order_invoice");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${order?._id}.pdf`);
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-[#f9f9fb] py-10 px-4">
      <MetaData title={"Order Invoice"} />

      <div className="max-w-4xl mx-auto">
        {/* DOWNLOAD BUTTON */}
        <div className="flex justify-center mb-6">
          <button
            className="inline-flex items-center justify-center gap-2 h-11 px-6 font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl shadow-xs transition-all cursor-pointer"
            onClick={handleDownload}
          >
            <Download /> Download PDF Invoice
          </button>
        </div>

        {/* MOBILE RESPONSIVE WRAPPER */}
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-200/80 shadow-xs bg-white">
          {/* FIXED DESKTOP CANVAS */}
          <div
            id="order_invoice"
            className="min-w-[800px] p-12 bg-white text-[#3f3f46] font-sans antialiased"
          >
            {/* TOP CENTERED HEADER SECTION */}
            <header className="flex flex-col items-center text-center border-b border-zinc-100 pb-8 mb-8">
              <div id="logo" className="flex flex-col items-center mb-4">
                <img
                  src="/icon.png"
                  alt="GadgetLand Logo"
                  className="h-16 w-16 object-contain mb-2"
                />
                <h2 className="text-xl font-black tracking-tight text-zinc-950 uppercase">
                  GadgetLand
                </h2>
              </div>

              <div className="mt-2">
                <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-400 font-mono">
                  Official Statement
                </h1>
                <p className="text-xs font-mono text-zinc-500 mt-1">
                  Token ID:{" "}
                  <span className="text-zinc-900 font-semibold select-all">
                    {order?._id}
                  </span>
                </p>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-12 mb-10 text-xs">
              {/* FROM COMPANY INFO */}
              <div>
                <h3 className="font-bold font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Issued By
                </h3>
                <div className="space-y-1 text-zinc-600">
                  <div className="font-bold text-zinc-900 text-sm">
                    GadgetLand Co.
                  </div>
                  <div>Building 12-B, Blue Area,</div>
                  <div>Islamabad, 44000, Pakistan</div>
                  <div>+92 (51) 287-4321</div>
                  <div>
                    <a
                      href="mailto:info@gadgetland.com"
                      className="text-zinc-500 underline hover:text-zinc-900"
                    >
                      info@gadgetland.com
                    </a>
                  </div>
                </div>
              </div>

              {/* TO CUSTOMER SHIPPING DETAILS */}
              <div>
                <h3 className="font-bold font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Deliver To
                </h3>
                <div className="space-y-1 text-zinc-600">
                  <div className="font-bold text-zinc-900 text-sm">
                    {user?.name}
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">EMAIL:</span>{" "}
                    {user?.email}
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">PHONE:</span>{" "}
                    {shippingInfo?.phoneNo}
                  </div>
                  <div className="leading-relaxed">
                    <span className="text-zinc-400 font-mono">ADDR:</span>{" "}
                    {shippingInfo?.address}, {shippingInfo?.city},{" "}
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </div>
                  <div className="pt-1 flex gap-4 text-[11px]">
                    <div>
                      <span className="text-zinc-400 font-mono">DATE:</span>{" "}
                      {new Date(order?.createdAt).toLocaleDateString(
                        undefined,
                        { dateStyle: "medium" },
                      )}
                    </div>
                    <div>
                      <span className="text-zinc-400 font-mono">STATUS:</span>{" "}
                      <span className="uppercase font-bold text-zinc-900">
                        {paymentInfo?.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN ITEMS TABLE */}
            <main>
              <table className="w-full border-collapse text-left text-xs mb-10">
                <thead>
                  <tr className="border-b-2 border-zinc-900 text-zinc-400 font-mono font-bold tracking-wider">
                    <th className="py-3 pr-4 w-1/4">ITEM ID</th>
                    <th className="py-3 px-4 w-2/5">PRODUCT DESCRIPTION</th>
                    <th className="py-3 px-4 text-right">UNIT PRICE</th>
                    <th className="py-3 px-4 text-center">QTY</th>
                    <th className="py-3 pl-4 text-right">LINE TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {orderItems?.map((item) => (
                    <tr
                      key={item?.product}
                      className="hover:bg-zinc-50/40 transition-colors"
                    >
                      <td
                        className="py-4 pr-4 font-mono text-zinc-400 truncate max-w-[120px]"
                        title={item?.product}
                      >
                        {item?.product}
                      </td>
                      <td className="py-4 px-4 font-bold text-zinc-900">
                        {item?.name}
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-zinc-600">
                        Rs.{" "}
                        {item?.price?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-zinc-800">
                        ×{item?.quantity}
                      </td>
                      <td className="py-4 pl-4 text-right font-mono font-bold text-zinc-950">
                        Rs.{" "}
                        {(item?.price * item?.quantity)?.toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 },
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* PAYMENT BLOCK */}
                  <tr className="border-t border-zinc-200">
                    <td colSpan="3" className="py-3"></td>
                    <td className="py-3 px-4 text-zinc-400 font-mono uppercase text-right">
                      Subtotal
                    </td>
                    <td className="py-3 pl-4 text-right font-mono text-zinc-700">
                      Rs.{" "}
                      {order?.itemsPrice?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="py-1"></td>
                    <td className="py-1 px-4 text-zinc-400 font-mono uppercase text-right">
                      Tax (15%)
                    </td>
                    <td className="py-1 pl-4 text-right font-mono text-zinc-700">
                      Rs.{" "}
                      {order?.taxAmount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" className="py-1"></td>
                    <td className="py-1 px-4 text-zinc-400 font-mono uppercase text-right">
                      Shipping
                    </td>
                    <td className="py-1 pl-4 text-right font-mono text-zinc-700">
                      Rs.{" "}
                      {order?.shippingAmount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>

                  <tr className="border-t border-dashed border-zinc-300">
                    <td colSpan="3" className="py-4"></td>
                    <td className="py-4 px-4 text-zinc-900 font-black tracking-wider text-right">
                      GRAND TOTAL
                    </td>
                    <td className="py-4 pl-4 text-right font-mono font-black text-lg text-zinc-950">
                      Rs.{" "}
                      {order?.totalAmount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* FOOTER */}
              <div
                id="notices"
                className="border-t border-zinc-100 pt-6 text-[11px] text-zinc-400 space-y-1"
              >
                <div className="font-bold text-zinc-500 font-mono uppercase tracking-wider text-[10px]">
                  Important Terminology Notice:
                </div>
                <div className="notice leading-relaxed">
                  A finance charge of 1.5% will be added to unpaid historical
                  balances outstanding past a 30-day clearing window.
                </div>
              </div>
            </main>

            <footer className="mt-12 pt-4 border-t border-zinc-100 text-center text-[11px] text-zinc-300 font-medium">
              This invoice document was digitally compiled and rendered by safe
              architecture parameters and is valid without physical verification
              or signing markers.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
