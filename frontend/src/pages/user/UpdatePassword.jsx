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

      <div className="space-y-6 font-sans max-w-xl">
        <div>
          <h3 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
            Security Configuration
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Update your password parameters to keep your account secure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 sm:p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="old_password_field"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="new_password_field"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500"
            >
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isLoading ? "Updating..." : "UPDATE PASSWORD"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdatePassword;
