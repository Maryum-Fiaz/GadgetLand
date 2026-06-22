import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminLayout from '../../pages/admin/AdminLayout'
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
      }
    ]
    
  },
];