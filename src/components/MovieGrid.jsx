// src/components/MovieGrid.jsx
import * as React from "react";
import { Grid, Container, Typography, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

export default function MovieGrid() {
  const { items, status, error, query } = useSelector((s) => s.movies);

  return (
    <Container sx={{ py: 3 }}>
      {status === "idle" && (
        <Typography align="center" sx={{ mt: 6, opacity: 0.8 }}>
          Search for a movie to get started.
        </Typography>
      )}

      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {status === "failed" && (
        <Typography color="error" align="center" sx={{ mt: 6 }}>
          {error}
        </Typography>
      )}

      {status === "succeeded" && items.length === 0 && (
        <Typography align="center" sx={{ mt: 6 }}>
          No results for “{query}”.
        </Typography>
      )}

      {items.length > 0 && (
        <Grid container spacing={2}>
          {items.map((m) => (
            <Grid key={m.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={m} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

