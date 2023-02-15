import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  let auth = localStorage.getItem("access_token");
  return auth ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
