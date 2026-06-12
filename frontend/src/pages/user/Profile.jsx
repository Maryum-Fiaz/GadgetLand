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
      
      <div className="space-y-6 font-sans max-w-2xl">
        
        {/* Section Headline */}
        <div>
          <h3 className="text-base font-bold text-zinc-800">Account Overview</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Your personal credentials and account details.</p>
        </div>

        {/* Info Grid Container */}
        <div className={`grid grid-cols-1 ${user?.role === 'admin' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4`}>
          
          {/* Full Name Block */}
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 shrink-0">
              <User size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Full Name</span>
              <p className="text-sm font-semibold text-zinc-700">{user?.name || "N/A"}</p>
            </div>
          </div>

          {/* Email Address Block */}
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 shrink-0">
              <Mail size={16} />
            </div>
            <div className="space-y-0.5 break-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Email Address</span>
              <p className="text-sm font-semibold text-zinc-700">{user?.email || "N/A"}</p>
            </div>
          </div>

          {/* Account Status / Role Block */}
          {user?.role === 'admin' && 
          
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 shrink-0">
              <ShieldAlert size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Account Privilege</span>
              <p className="text-sm font-bold text-mauve-500 capitalize">{user?.role || "user"}</p>
            </div>
          </div>
          }

          {/* Membership Joined Date Block */}
          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 shrink-0">
              <Calendar size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Member Since</span>
              <p className="text-sm font-semibold text-zinc-700">{joinedDate}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;