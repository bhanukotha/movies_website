// src/store/moviesSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMovies, fetchCredits } from "../api/tmdb";

/**
 * Thunk: search by term, then fetch credits for each result
 * (limits to first 12 results for performance)
 */
export const searchMoviesWithCast = createAsyncThunk(
  "movies/searchMoviesWithCast",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await searchMovies(query, page);
      const trimmed = data.results.slice(0, 12);

      const withCast = await Promise.all(
        trimmed.map(async (m) => {
          try {
            const credits = await fetchCredits(m.id);
            const topCast = (credits.cast || [])
              .slice(0, 3)
              .map((c) => c.name);
            return { ...m, topCast };
          } catch {
            return { ...m, topCast: [] };
          }
        })
      );

      return {
        page: data.page,
        total_pages: data.total_pages,
        results: withCast,
        query,
      };
    } catch (err) {
      return rejectWithValue(err.message || "Search failed");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    query: "",
    page: 1,
    totalPages: 1,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    items: [],
  },
  reducers: {
    clearMovies(state) {
      state.items = [];
      state.page = 1;
      state.totalPages = 1;
      state.query = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMoviesWithCast.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchMoviesWithCast.fulfilled, (state, action) => {
        const { results, page, total_pages, query } = action.payload;
        state.status = "succeeded";
        state.items = results;
        state.page = page;
        state.totalPages = total_pages;
        state.query = query;
      })
      .addCase(searchMoviesWithCast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
