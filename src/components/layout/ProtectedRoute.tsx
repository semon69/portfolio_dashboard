import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/authSlice";
import { useCurrentToken } from "../../redux/features/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // The JWT carries an expiry. Previously only its presence was checked,
  // so an expired session looked signed in until every request 401'd.
  const expired = Boolean(user?.exp && user.exp * 1000 <= Date.now());

  if (!token || expired) {
    if (expired) dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
