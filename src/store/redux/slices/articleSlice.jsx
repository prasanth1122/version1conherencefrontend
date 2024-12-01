import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles, getArticleById } from "../../../../Api/Api.js";

const initialState = {
  articles: [], // Store the list of articles
  selectedArticle: null, // Store a single article when fetched by ID
  isLoading: false, // General loading state
  isError: false, // General error state
  errorMessage: "", // Store error message
};

// Async action to fetch all articles
export const fetchAllArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await getAllArticles();
      return response; // Return the list of articles
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch articles"
      );
    }
  }
);

// Async action to fetch a specific article by ID
export const fetchArticleById = createAsyncThunk(
  "articles/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await getArticleById(id);
      return response; // Return the article data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch article by ID"
      );
    }
  }
);

// Async action to batch fetch multiple articles
export const fetchArticlesBatch = createAsyncThunk(
  "articles/fetchBatch",
  async (ids, thunkAPI) => {
    try {
      // Fetch each article sequentially
      const articles = [];
      for (const id of ids) {
        const article = await thunkAPI.dispatch(fetchArticleById(id)).unwrap();
        articles.push(article);
      }
      return articles; // Return the list of fetched articles
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch articles batch"
      );
    }
  }
);

// Create the article slice
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearSelectedArticle: (state) => {
      state.selectedArticle = null; // Clear the selected article
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching all articles
      .addCase(fetchAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.articles = action.payload; // Store the fetched articles
        state.errorMessage = "";
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch articles";
      })
      // Handle fetching a single article by ID
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.selectedArticle = action.payload; // Store the fetched article
        state.errorMessage = "";
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch article by ID";
      })
      // Handle batch fetching articles
      .addCase(fetchArticlesBatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesBatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.articles = action.payload; // Merge or overwrite fetched articles
        state.errorMessage = "";
      })
      .addCase(fetchArticlesBatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch articles batch";
      });
  },
});

export const { clearSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;
