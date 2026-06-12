import Register from "../../pages/auth/Register";
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import Login from "../../pages/auth/Login";
import UserLayout from "../../pages/user/UserLayout";
import Profile from "../../pages/user/Profile";
import UpdateProfile from "../../pages/user/UpdateProfile";





export const userRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/me',
        element: <UserLayout />,
        children: [
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'update',
                element: <UpdateProfile />
            }
        ]
    }
]