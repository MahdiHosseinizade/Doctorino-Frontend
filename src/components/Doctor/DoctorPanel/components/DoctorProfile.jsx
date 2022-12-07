import { Box, Grid } from "@mui/material";
import React from "react";

export default function DoctorProfile(props) {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
      }}
    >
      <Grid container>
        <Grid item>
          <h1>Doctor Profile</h1>
        </Grid>
      </Grid>
    </Box>
  );
}
