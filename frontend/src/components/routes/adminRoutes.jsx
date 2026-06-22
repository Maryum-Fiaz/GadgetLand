import AdminLayout from '../../pages/admin/AdminLayout'
import {ProtectedRoute} from '../index'

export const adminRoutes = [
    {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
  },
];