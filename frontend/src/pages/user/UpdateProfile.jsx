import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // 🎯 Clean matching router import
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MetaData from "../../components/layout/MetaData";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading, error, isSuccess }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }

    if (isSuccess) {
      toast.success("User Profile Updated Successfully");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Fields cannot be left blank");
      return;
    }
    updateProfile({ name, email });
  };

  return (
    <>
      <MetaData title={"Update Profile"} />
      
      <div className="space-y-6 font-sans max-w-xl">
        
        {/* Section Headline */}
        <div>
          <h3 className="text-base font-bold text-zinc-800">Update Profile</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Modify your basic account info and identities.</p>
        </div>

        {/* Premium Form Body Container */}
        <form onSubmit={handleSubmit} className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 sm:p-6 space-y-4">
          
          {/* Name Input Box Element */}
          <div className="space-y-1.5">
            <label htmlFor="name_field" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Full Name
            </label>
            <input
              type="text"
              id="name_field"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 text-sm font-medium rounded-xl bg-white border border-zinc-200 text-zinc-800 placeholder-zinc-300 outline-none transition-all duration-200 focus:border-mauve-400 focus:ring-2 focus:ring-mauve-100"
              required
            />
          </div>

          {/* Email Input Box Element */}
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

          {/* Action Trigger Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-mauve-500 hover:bg-mauve-600 active:bg-mauve-700 text-white font-sans text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-sm disabled:bg-zinc-300 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
            >
              {isLoading ? "Saving changes..." : "SAVE PROFILE"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default UpdateProfile;