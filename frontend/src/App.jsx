import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./RootLayout"
import { userRoutes } from "./components/routes/UserRoutes"



function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        ...userRoutes,
      ]
    }
  ])


  return <RouterProvider router={router} />
}

export default App
