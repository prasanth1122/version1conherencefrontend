import axios from "axios";

const url = "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: url, // Your backend URL
});

// Request interceptor to add the JWT token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Only add the token if it's not expired
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to handle login
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error; // Throwing error to be handled by caller
  }
};

// Function to handle signup
export const signup = async (
  name,
  email,
  password,
  role,
  userType,
  institution
) => {
  try {
    const response = await api.post("/users/signup", {
      name,
      email,
      password,
      role,
      userType,
      institution,
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error; // Throwing error to be handled by caller
  }
};
export const checkEmail = async (email) => {
  try {
    const response = await api.post("/users/checkemail", { email });
    return response.data; // { exists: true/false, message: string }
  } catch (error) {
    console.error(
      "Error checking email:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; // Assuming your API response contains the user in `data`
  } catch (error) {
    console.error(
      "Failed to fetch user by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await api.get(`/periodical/editorial/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch article by ID:", error);
    throw error;
  }
};

export const getAllArticles = async () => {
  try {
    const response = await api.get("/periodical/editorial");
    return response.data; // Return the list of articles
  } catch (error) {
    console.error("Failed to fetch all articles:", error);
    throw error;
  }
};

export const getPeriodicalById = async (id) => {
  try {
    const response = await api.get(`/periodical/periodicals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch periodical by ID:", error);
    throw error;
  }
};

export const getAllPeriodicals = async () => {
  try {
    const response = await api.get("/periodical/periodicals");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all periodicals:", error);
    throw error;
  }
};
// Function to handle logout
export const logout = async () => {
  try {
    await api.post("/logout");
    // Clear the token and refresh token from cookies
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed", error);
    throw error; // Handle logout error
  }
};

// Subscription-related functions

// Create or update a subscription
export const createOrUpdateSubscription = async (
  userId,
  type,
  paymentStatus
) => {
  try {
    const response = await api.post("/subscriptions", {
      userId,
      type,
      paymentStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create or update subscription:", error);
    throw error;
  }
};

// Get the user's active subscription
export const getUserSubscription = async (userId) => {
  try {
    const response = await api.get(`/subscriptions/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user's active subscription:", error);
    throw error;
  }
};

export const createFreeSubscription = async (userId) => {
  try {
    const response = await api.post("/subscriptions/createfree", {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create free subscription:", error);
    throw error;
  }
};
// Cancel a subscription
export const addCommentToArticle = async (articleId, userId, text) => {
  try {
    const response = await api.post(`/comment/${articleId}`, {
      userId,
      text,
    });
    return response.data; // Return the response after successfully adding the comment
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error; // Handle the error appropriately
  }
};
export const isArticleSaved = async (userId, articleId) => {
  try {
    const response = await api.get(
      `/library/checkSavedArticle/${userId}/${articleId}`
    );
    return response.data; // Return the result (saved or not)
  } catch (error) {
    console.error("Failed to check if article is saved:", error);
    throw error;
  }
};
export const saveArticle = async (
  userId,
  articleId,
  title,
  category,
  month,
  year,
  isMonthlyEdition
) => {
  try {
    const response = await api.post(`/library/${userId}/save`, {
      articleId,
      title,
      category,
      month,
      year,
      isMonthlyEdition,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save article:", error);
    throw error;
  }
};

// Function to unsave an article
export const unsaveArticle = async (userId, articleId) => {
  try {
    const response = await api.delete(`/library/${userId}/unsave`, {
      data: { articleId }, // Send articleId in request body
    });
    return response.data;
  } catch (error) {
    console.error("Failed to unsave article:", error);
    throw error;
  }
};

// Function to get saved articles
export const getSavedArticles = async (userId) => {
  try {
    const response = await api.get(`/library/${userId}/savedarticles`);
    return response.data; // Return saved articles
  } catch (error) {
    console.error("Failed to fetch saved articles:", error);
    throw error;
  }
};

// Export the API instance
export default api;
