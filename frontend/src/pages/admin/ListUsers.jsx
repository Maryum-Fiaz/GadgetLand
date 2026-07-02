import { useEffect } from "react";
import { CustomTable, Loader, MetaData } from "../../components";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import {
  useGetAdminUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";

function ListUsers() {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  // Ready setup for delete user mutation (uncomment when your backend endpoint is ready)
  const [
    deleteUser,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User deleted successfully!");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  // Columns matching custom table
  const tableColumns = [
    { label: "ID", field: "id", align: "left" },
    { label: "Name", field: "name", align: "left" },
    { label: "Email", field: "email", align: "left" },
    { label: "Role", field: "role", align: "left" },
    { label: "Actions", field: "actions", align: "right" },
  ];

  const tableData =
    data?.users?.map((user) => {
      return {
        id: (
          <span className="font-mono text-xs text-zinc-400 select-all">
            {user?._id}
          </span>
        ),
        name: (
          <span className="text-xs font-medium text-zinc-800">
            {user?.name}
          </span>
        ),
        email: <span className="text-xs text-zinc-500">{user?.email}</span>,
        role: (
          <span
            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
              user?.role === "admin"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-zinc-100 text-zinc-600 border-zinc-200"
            }`}
          >
            {user?.role}
          </span>
        ),
        actions: (
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/users/${user?._id}`}
              className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-blue-200 flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              title="Edit User Details"
            >
              <Pencil size={14} />
            </Link>

            <button
              type="button"
              onClick={() => deleteUserHandler(user?._id)}
              disabled={isDeleteLoading}
              className="h-8 w-8 rounded-lg border border-zinc-200 bg-white hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center text-zinc-400 hover:text-rose-600 transition-colors disabled:opacity-40 cursor-pointer"
              title="Delete User"
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
      <MetaData title={"All Registered Users"} />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
            User Database
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {data?.users?.length || 0} Accounts Registered
          </p>
        </div>
      </div>

      <CustomTable columns={tableColumns} data={tableData} />
    </>
  );
}

export default ListUsers;
