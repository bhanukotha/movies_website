// src/components/SelectorComponent.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

/**
 * Placeholder dropdowns (genre/year/etc.)
 * Currently not wired to filters to keep focus on search results.
 */
export default function SelectorComponent() {
  const [value, setValue] = React.useState("");

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth size="small" variant="outlined" sx={{ bgcolor: "rgba(255,255,255,.1)", borderRadius: 1 }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Filter"
          onChange={(e) => setValue(e.target.value)}
        >
          <MenuItem value={"popular"}>Popular</MenuItem>
          <MenuItem value={"top_rated"}>Top Rated</MenuItem>
          <MenuItem value={"upcoming"}>Upcoming</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
