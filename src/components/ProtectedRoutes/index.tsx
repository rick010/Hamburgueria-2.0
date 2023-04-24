import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";
import { CartProvider } from "../../providers/CartContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <CartProvider>
      <Outlet />
    </CartProvider>
  ) : (
    <Navigate to="/" />
  );
};
