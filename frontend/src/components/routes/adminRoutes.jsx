import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminLayout from '../../pages/admin/AdminLayout'
import ListOrders from '../../pages/admin/ListOrders';
import ListProducts from '../../pages/admin/ListProducts';
import ListUsers from '../../pages/admin/ListUsers';
import NewProduct from '../../pages/admin/NewProduct';
import ProcessOrder from '../../pages/admin/ProcessOrder';
import UpdateProduct from '../../pages/admin/UpdateProduct'
import UploadImages from '../../pages/admin/UploadImages';
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
      },
      {
        path: "products/:id",
        element: <UpdateProduct />
      },
      {
        path: "products/:id/upload_images",
        element: <UploadImages />
      },
      {
        path: "orders",
        element: <ListOrders />
      },
      {
        path: "orders/:id",
        element: <ProcessOrder />
      },
      {
        path: "users",
        element: <ListUsers />
      },
    ]
    
  },
];