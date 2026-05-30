import Home from "../../pages/Home";
import Products from "../../pages/Products";




export const userRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/products',
        element: <Products />
    }
]