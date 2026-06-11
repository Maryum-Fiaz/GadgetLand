import Home from "../../pages/Home";
import Products from "../../pages/Products";
import Login from "../auth/Login";




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
    }
]