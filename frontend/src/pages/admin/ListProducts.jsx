import { useEffect } from "react";

import { toast } from "react-hot-toast";
import { Link } from "react-router";

import { Pencil, ImagePlus, Trash2 } from "lucide-react"; // Sleek native icons
import {
  // useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productApi";

import { Loader, MetaData, CustomTable } from "../../components";
;

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  // const [
  //   deleteProduct,
  //   { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  // ] = useDeleteProductMutation();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error?.data?.message);
  //   }

  //   if (deleteError) {
  //     toast.error(deleteError?.data?.message);
  //   }

  //   if (isSuccess) {
  //     toast.success("Product Deleted successfully");
  //   }
  // }, [error, deleteError, isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

  }, [error]);
  // const deleteProductHandler = (id) => {
  //   if (window.confirm("Are you sure you want to drop this asset node?")) {
  //     deleteProduct(id);
  //   }
  // };

  // Define Columns configuration matching your CustomTable requirements
  const tableColumns = [
    { label: "ID", field: "id", align: "left" },
    { label: "Product Name", field: "name", align: "left" },
    { label: "Stock", field: "stock", align: "left" },
    { label: "Actions", field: "actions", align: "right" },
  ];

  // Format the raw backend array to populate rows reactively
  const tableData = data?.products?.map((product) => ({
    id: <span className="font-mono text-zinc-400 text-[11px]">#{product?._id}</span>,
    name: (
      <span className="font-medium text-zinc-800 tracking-tight block max-w-xs truncate">
        {product?.name}
      </span>
    ),
    stock: (
      <span
        className={`font-mono font-bold text-xs ${
          product?.stock > 0 ? "text-zinc-600" : "text-rose-500 font-extrabold"
        }`}
      >
        {product?.stock}
      </span>
    ),
    actions: (
      <div className="flex items-center justify-end gap-2">
        {/* Edit Form Node Link */}
        <Link
          to={`/admin/products/${product?._id}`}
          className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-blue-200 flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          title="Edit Details"
        >
          <Pencil size={14} />
        </Link>

        {/* Media Asset Manager Link */}
        <Link
          to={`/admin/products/${product?._id}/upload_images`}
          className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-yellow-200 flex items-center justify-center text-zinc-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors cursor-pointer"
          title="Upload Images"
        >
          <ImagePlus size={14} />
        </Link>

        {/* Core Purge Trigger Action Button */}
        <button
          type="button"
          // onClick={() => deleteProductHandler(product?._id)}
          // disabled={isDeleteLoading}
          className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center text-zinc-400 hover:text-rose-600 transition-colors disabled:opacity-40 cursor-pointer"
          title="Delete Product"
        >
          <Trash2 size={14} />
        </button>
      </div>
    ),
  })) || [];

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"All Inventory Products"} />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-zinc-900 tracking-tight font-heading">
            Product Database Inventory
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {data?.products?.length || 0} Products
          </p>
        </div>
      </div>

      {/* Render your exact custom dynamic workspace wrapper table asset */}
      <CustomTable columns={tableColumns} data={tableData} />
    </>
  );
};

export default ListProducts;