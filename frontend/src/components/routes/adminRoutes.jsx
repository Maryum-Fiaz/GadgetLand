import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminLayout from '../../pages/admin/AdminLayout'
import ListProducts from '../../pages/admin/ListProducts';
import NewProduct from '../../pages/admin/NewProduct';
import {ProtectedRoute} from '../index'

export const adminRoutes = [
    {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: "products",
        element: <ListProducts />
      },
      {
        path: "product/new",
        element: <NewProduct />
      }
    ]
    
  },
];