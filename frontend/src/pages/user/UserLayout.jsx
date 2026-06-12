import { DashboardLayout } from '../../components/index'
import { Lock, User, UserCheck } from 'lucide-react';

const userLinks = [
  { name: "Profile", url: "/me/profile", icon: User },
  { name: "Update Profile", url: "/me/update_profile", icon: UserCheck },
  { name: "Update Password", url: "/me/update_password", icon: Lock },
];

function UserLayout() {
  return (
    <>
    <DashboardLayout title='User Settings' menuItems={userLinks}  />
    </>
  )
}

export default UserLayout