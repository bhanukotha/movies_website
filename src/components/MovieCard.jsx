
import * as React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IMG_BASE } from "../api/tmdb";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Card sx={{ borderRadius: 3, height: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height="340" image={poster} alt={movie.title} />
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
              {movie.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarIcon fontSize="small" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {rating}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.8 }}>
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "—"}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {(movie.topCast || []).length > 0 ? (
              movie.topCast.map((name) => (
                <Chip key={name} label={name} size="small" sx={{ mb: 1 }} />
              ))
            ) : (
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Cast info unavailable
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
