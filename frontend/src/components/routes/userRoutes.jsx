import { Home, Products } from "../index.js";



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