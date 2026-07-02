import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import MetaData from "../../components/layout/MetaData";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Email Sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    forgotPassword({ email });
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-12 font-sans selection:bg-mauve-100">
        <div className="w-full max-w-110 px-2">
          
          {/* Main Premium Card View */}
          <form 
            onSubmit={submitHandler} 
            className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            {/* Card Header Title */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800">Recover Password</h2>
              <p className="text-xs font-medium text-zinc-400">Enter your email link to receive reset credentials</p>
            </div>

            {/* Email Field Block */}
            <div className="space-y-1.5">
              <label htmlFor="email_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Email Address
              </label>
              <input
                type="email"
                id="email_field"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
                required
              />
            </div>

            {/* Premium Action Button */}
            <button
              id="forgot_password_button"
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isLoading ? "Sending Link..." : "SEND RESET LINK"}
            </button>

            {/* Form Footer Redirect Block */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-center">
              <Link 
                to="/login" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-mauve-500 transition-colors"
              >
                <ArrowLeft size={13} strokeWidth={2.5} />
                Back to Login
              </Link>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;