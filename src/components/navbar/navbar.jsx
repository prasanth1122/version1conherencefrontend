import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current pathname

  // Function to determine if the current link is active
  const isActive = (path) =>
    location.pathname === path ? "text-secondary" : "";

  // Logout function

  const logout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear other app states or dependencies if necessary

    // Trigger storage event manually to notify PrivateRoutes

    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-primary flex items-center justify-center">
      <div className="flex items-center justify-between w-mainWidth py-8 text-white">
        <p
          className={`text-2xl font-semibold hidden md:block hover:cursor-pointer `}
          onClick={() => {
            navigate("/home");
          }}
        >
          Coherence
        </p>
        <img
          src={logo}
          alt="logo"
          className="h-8 md:hidden hover:cursor-pointer"
        />
        <div className="flex items-center gap-4 md:gap-8">
          <p
            className={`text-sm md:text-lg hover:cursor-pointer ${isActive(
              "/subscription"
            )}`}
            onClick={() => {
              navigate("/subscription");
            }}
          >
            Pricing
          </p>

          <p
            className={`text-sm md:text-lg hover:cursor-pointer ${isActive(
              "/store"
            )}`}
            onClick={() => {
              navigate("/store");
            }}
          >
            Store
          </p>
          <p
            className={`text-sm md:text-lg hover:cursor-pointer ${isActive(
              "/library"
            )}`}
            onClick={() => {
              navigate("/library");
            }}
          >
            Library
          </p>
          <p
            className="text-sm md:text-lg hover:text-secondary hover:cursor-pointer"
            onClick={logout} // Trigger logout function on click
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
}
