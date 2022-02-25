import { Navigate, useLocation } from "react-router-dom";

function AuthRoute({ children }: { children: any }) {
  const location = useLocation();
  return currentUser() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }}></Navigate>
  );
}

// todo move to authService
function currentUser(): any {}

export default AuthRoute;
