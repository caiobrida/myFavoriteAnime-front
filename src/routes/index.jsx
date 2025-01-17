import Login from "../pages/Login"
import PageNotFound from "../pages/PageNotFound"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import PrivateRoutes from "./components/PrivateRoutes"
import { createBrowserRouter } from "react-router-dom"

const routes = [
    {
        path: "/dashboard",
        element: <PrivateRoutes />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <PageNotFound />
    },
]

const router = createBrowserRouter(routes)

export default router