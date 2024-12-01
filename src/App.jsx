import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import StorePage from "./pages/storePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ArticlePage from "./pages/articlePage";
import CoherencePage from "./pages/coherencePage";
import SubscriptionPage from "./pages/subscriptionPage";
import LibraryPage from "./pages/libraryPage";
import HomePage from "./pages/homePage";

// PrivateRoute component to protect the route
// PrivateRoute component
const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Set authenticated state based on token presence
      setIsLoading(false); // Validation complete
    };

    validateAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="w-screen h-screen ">
        <Routes>
          {/* Redirect the root (/) to /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login page route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Store page route protected by PrivateRoute */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/coherenceapplied/:id" element={<CoherencePage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/library" element={<LibraryPage />} />
          </Route>

          {/* Handle 404 for undefined routes */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
