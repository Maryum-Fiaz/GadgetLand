import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./RootLayout"
import { userRoutes } from "./components/routes/userRoutes"
import { adminRoutes } from "./components/routes/AdminRoutes"



function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        ...userRoutes,
        ...adminRoutes,
      ]
    }
  ])


  return <RouterProvider router={router} />
}

export default App
