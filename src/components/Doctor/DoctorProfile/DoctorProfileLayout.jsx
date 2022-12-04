import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import DoctorProfile from "./Profile";

export default function DoctorProfileLayout() {
    return (
        <Container>
            <Grid container>
                <Grid

                    xs={8}
                    md={8}
                    lg={8}
                    item
                    sx={{
                        Width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        height: "auto",
                        alignItems: "center",
                        boxSizing: " border-box"
                    }}
                >
                    <Paper>
                        <DoctorProfile />
                    </Paper>
                </Grid>

                <Grid
                    item
                    xs={4}
                    md={4}
                    lg={4}
                    sx={{
                        Width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        height: "auto",
                        alignItems: "center",
                        boxSizing: " border-box"
                    }}
                >
                    <Paper>
                        <DoctorProfile />
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
}
