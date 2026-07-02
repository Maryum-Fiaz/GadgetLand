import { MetaData } from "../../components";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [updatePassword, { error, isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPasswordData = {
      oldPassword,
      password,
    };

    updatePassword(userPasswordData);
  };

  return (
    <>
  <MetaData title={"Update Password"} />

  <div className="w-full max-w-xl mx-auto px-4 py-8 font-sans">
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="pb-4 border-b border-zinc-100">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
          Security Configuration
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Update your password parameters to keep your account secure.
        </p>
      </div>

      <div className="space-y-4">
        
        <div className="space-y-1.5">
          <label
            htmlFor="old_password_field"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400"
          >
            Old Password
          </label>
          <input
            type="password"
            id="old_password_field"
            placeholder="••••••••"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="new_password_field"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400"
          >
            New Password
          </label>
          <input
            type="password"
            id="new_password_field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
            required
          />
        </div>

      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-36 h-11 bg-mauve-500 hover:bg-mauve-600 disabled:bg-zinc-200 text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-colors shadow-xs disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
        >
          {isLoading ? "Saving..." : "Update"}
        </button>
      </div>
    </form>
  </div>
</>
  );
}

export default UpdatePassword;
