import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const ProtectedRouteAdmin = ({ children }) => {
  const { isValidLogin, isFetching, hasLogin } = useAuth("auth/me/admin");


  useEffect(() => {
    hasLogin();
  }, [hasLogin])

  if(isFetching) {
      return <div>Loading</div>
  }

  if (!isValidLogin) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteAdmin;