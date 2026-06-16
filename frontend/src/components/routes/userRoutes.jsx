import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import Login from "../../pages/auth/Login";
import UserLayout from "../../pages/user/UserLayout";
import Profile from "../../pages/user/Profile";
import UpdateProfile from "../../pages/user/UpdateProfile";
import ProtectedRoute from "../ProtectedRoute";
import UpdatePassword from "../../pages/user/UpdatePassword";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";
import ProductDetail from "../product/ProductDetail";
import Cart from "../../pages/cart/Cart";
import Shipping from "../../pages/cart/Shipping";
import ConfirmOrder from "../../pages/cart/ConfirmOrder";
import PaymentMethod from "../../pages/cart/PaymentMethod";

export const userRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/password/reset/:token",
    element: <ResetPassword />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/me",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "update",
        element: <UpdateProfile />,
      },
      {
        path: "password/update",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "/shipping",
    element: (
      <ProtectedRoute>
        <Shipping />
      </ProtectedRoute>
    ),
  },
  {
    path: "/confirm_order",
    element: (
      <ProtectedRoute>
        <ConfirmOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment_method",
    element: (
      <ProtectedRoute>
        <PaymentMethod />
      </ProtectedRoute>
    ),
  },
];
