import { Navigate } from "react-router-dom";

export const AdminRoutes = ({ children }) => {
  if (
    JSON.parse(localStorage.getItem("currentUser")).user.email ===
    "test10@gmail.com"
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
