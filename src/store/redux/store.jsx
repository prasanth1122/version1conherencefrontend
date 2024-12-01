// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice.jsx"; // Import the authSlice reducer
import articleReducer from "../redux/slices/articleSlice.jsx";
import libraryReducer from "../redux/slices/librarySlice.jsx";
const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    library: libraryReducer,
  },
});

export default store;
