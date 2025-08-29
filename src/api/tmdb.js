// src/api/tmdb.js
const API_KEY = "92c1cb16c75569d09b4ae6b3f8647dcd";
const BEARER =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMxY2IxNmM3NTU2OWQwOWI0YWU2YjNmODY0N2RjZCIsIm5iZiI6MTc1NTU0MzMxMi4yMDUsInN1YiI6IjY4YTM3NzEwOGUzNTg3YTY0YWY2NmY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._BuiXp3fVtZ8rZfFpIzHKOmg8-cNn2RxbymU2dyV6mk";

const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const commonHeaders = {
  Authorization: `Bearer ${BEARER}`,
  "Content-Type": "application/json;charset=utf-8",
};

export async function searchMovies(query, page = 1) {
  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.set("query", query);
  url.searchParams.set("page", page);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("api_key", API_KEY); // either key or bearer works

  const res = await fetch(url, { headers: commonHeaders });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json(); // { results, total_pages, ... }
}

export async function fetchCredits(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: commonHeaders,
  });
  if (!res.ok) throw new Error("Failed to fetch credits");
  return res.json(); // { cast, crew }
}
