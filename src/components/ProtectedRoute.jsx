import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(state => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;