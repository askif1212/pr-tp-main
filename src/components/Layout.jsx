import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Layout() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-[100vw]">
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Laptop Shop
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600"
            >
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/orders"
              className="relative text-gray-700 hover:text-blue-600"
            >
              📦 Orders
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  👤 {user.email}
                </button>
                <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded p-2 mt-1">
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-600 whitespace-nowrap"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full mx-0 my-5">
        <Outlet />
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2023 Laptop Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
