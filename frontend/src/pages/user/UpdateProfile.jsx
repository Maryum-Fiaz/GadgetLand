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

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

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

  <div className="w-full max-w-xl mx-auto px-4 py-8 font-sans">
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Heading */}
      <div className="pb-4 border-b border-zinc-100">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
          Update Profile
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Modify your basic account info and identities.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Name Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="name_field"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name_field"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200/70 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:border-mauve-400 focus:bg-white transition-all"
            required
          />
        </div>

        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email_field"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email_field"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
};

export default UpdateProfile;
