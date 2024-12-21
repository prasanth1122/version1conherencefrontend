import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Customized ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Ensure this is set for progress bar visibility
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          backgroundColor: "#F4F4F9", // highlight_background for toast background
          color: "#002147", // important_text for text color
        }}
        progressStyle={{
          background: "linear-gradient(to right, #305050, #FF5E5B)", // Primary color for success and secondary for error
        }}
      />
      <App />
    </Provider>
  </StrictMode>
);
