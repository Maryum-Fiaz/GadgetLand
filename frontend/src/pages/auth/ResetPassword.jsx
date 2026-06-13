import { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { MetaData } from "../../components";



const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password does not match. Try again!");
    }

    const data = { password, confirmPassword };

    resetPassword({ token: params?.token, body: data });
  };

  return (
   <>
  <MetaData title={"Reset Password"} />
  
  {/* Dynamic viewport wrapper centering the card cleanly on all devices */}
  <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 font-sans selection:bg-mauve-100">
    <div className="w-full max-w-110">
      
      {/* Premium Minimalist Form Card */}
      <form 
        onSubmit={submitHandler} 
        className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
      >
        {/* Typographic Header Section */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-800">New Password</h2>
          <p className="text-xs text-zinc-400">Configure a new strong cryptographic credential for your account.</p>
        </div>

        {/* Password Input Group */}
        <div className="space-y-1.5">
          <label htmlFor="password_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Password
          </label>
          <input
            type="password"
            id="password_field"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
            required
          />
        </div>

        {/* Confirm Password Input Group */}
        <div className="space-y-1.5">
          <label htmlFor="confirm_password_field" className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password_field"
            name="confirm_password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
            required
          />
        </div>

        {/* Interactive Action Button */}
        <div className="pt-2">
          <button
            id="new_password_button"
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
          >
            {isLoading ? "SETTING PASSWORD..." : "SET PASSWORD"}
          </button>
        </div>
      </form>

    </div>
  </div>
</>
  );
};

export default ResetPassword;
