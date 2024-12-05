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

import SubscriptionPage from "./pages/subscriptionPage";
import LibraryPage from "./pages/libraryPage";
import HomePage from "./pages/homePage";
import { GlobalProvider } from "./store/context/globalContext.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import LibPage from "./pages/libpage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import PeriodicalPage from "./pages/periodicalPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import ArticleReader from "./pages/articleReader.jsx";
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
    <GlobalProvider>
      <Router>
        <div className="w-screen h-screen scrollbar-hide  ">
          <Routes>
            {/* Redirect the root (/) to /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login page route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/side" element={<Sidebar />} />

            {/* Store page route protected by PrivateRoute */}
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />

              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/library" element={<LibPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/lib" element={<LibPage />} />
              <Route path="/:category/:id" element={<PeriodicalPage />} />

              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/article/:id" element={<ArticleReader />} />
            </Route>

            {/* Handle 404 for undefined routes */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
