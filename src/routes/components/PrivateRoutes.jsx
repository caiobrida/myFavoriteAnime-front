import { useLocation, Outlet, Navigate } from "react-router-dom";
import Header from "../../components/Header";
import { getCurrentUser } from "../../services/authService";

function Layout() {
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    )
  }

const PrivateRoutes = () => {
    const location = useLocation();
    const authLogin = getCurrentUser();

    return authLogin 
        ? <Layout />
        : <Navigate to="/" replace state={{ from: location }} />;
}

export default PrivateRoutes