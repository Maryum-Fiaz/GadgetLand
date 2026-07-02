import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { Loader, MetaData } from "../../components";
import { useNavigate, useParams } from "react-router";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const { data, isLoading } = useGetUserDetailsQuery(params?.id);
  const [updateUser, { error, isSuccess, isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { name, email, role };
    updateUser({ id: params?.id, body: userData });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Update User"} />
      
      <div className="w-full max-w-xl mx-auto px-4 py-8 font-sans">
        <form onSubmit={submitHandler} className="space-y-6">
          

          <div className="pb-4 border-b border-zinc-100">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
              Update Profile
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Modify database parameters for internal account systems
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name_field" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                id="name_field"
                className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email_field" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                id="email_field"
                className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label htmlFor="role_field" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Account Authority Status
              </label>
              <div className="relative">
                <select
                  id="role_field"
                  className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-700 focus:outline-none focus:border-mauve-400 focus:bg-white appearance-none cursor-pointer transition-all"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isUpdating}
              className="w-full sm:w-36 h-11 bg-mauve-500 hover:bg-mauve-600 disabled:bg-zinc-200 text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors shadow-xs disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isUpdating ? "Saving..." : "Update"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default UpdateUser;