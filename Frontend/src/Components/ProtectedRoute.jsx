import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/Firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;

  if (!user) return <Navigate to="/admin" replace />;

  return children;
};

export default ProtectedRoute;
