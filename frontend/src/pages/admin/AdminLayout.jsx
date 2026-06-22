import { LayoutDashboard, Package, PlusCircle, Receipt, Star, Users } from "lucide-react"
import { DashboardLayout } from "../../components"

const adminLinks = [
    { name: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { name: "New Product", url: "/admin/product/new", icon: PlusCircle },
  { name: "Products", url: "/admin/products", icon: Package },
  { name: "Orders", url: "/admin/orders", icon: Receipt },
  { name: "Users", url: "/admin/users", icon: Users },
  { name: "Reviews", url: "/admin/reviews", icon: Star },
]

function adminLayout() {
  return <DashboardLayout title='Admin Settings' menuItems={adminLinks}  />
}

export default adminLayout