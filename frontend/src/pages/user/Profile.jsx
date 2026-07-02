import { useSelector } from "react-redux";
import MetaData from "../../components/layout/MetaData"; // Double check your MetaData path!
import { Calendar, Mail, ShieldAlert, User } from "lucide-react";

const Profile = () => {
  // Grab the logged-in user details directly from your global Redux auth state
  const { user } = useSelector((state) => state.auth);

  // Safely format your MongoDB date string (e.g., "2026-06-12" from timestamp)
  const joinedDate = user?.createdAt ? user?.createdAt.substring(0, 10) : "---";

  return (
    <>
  <MetaData title={"Your Profile"} />
  
  <div className="w-full max-w-xl mx-auto px-4 py-8 font-sans">
    <div className="space-y-6">
      
      <div className="pb-4 border-b border-zinc-100">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 font-heading">
          Account Overview
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Your personal credentials and account details.
        </p>
      </div>

      <div className="space-y-4">
        
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Full Name
          </span>
          <div className="text-xs font-medium text-zinc-800 py-2.5 flex items-center gap-2">
            <User size={14} className="text-zinc-400 shrink-0" />
            <span>{user?.name || "N/A"}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Email Address
          </span>
          <div className="text-xs font-medium text-zinc-800 py-2.5 flex items-center gap-2 break-all">
            <Mail size={14} className="text-zinc-400 shrink-0" />
            <span>{user?.email || "N/A"}</span>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Account Authority Status
            </span>
            <div className="text-xs font-bold text-mauve-500 capitalize py-2.5 flex items-center gap-2">
              <ShieldAlert size={14} className="text-mauve-400 shrink-0" />
              <span>{user?.role}</span>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Member Since
          </span>
          <div className="text-xs font-medium text-zinc-800 py-2.5 flex items-center gap-2">
            <Calendar size={14} className="text-zinc-400 shrink-0" />
            <span>{joinedDate}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</>
  );
};

export default Profile;