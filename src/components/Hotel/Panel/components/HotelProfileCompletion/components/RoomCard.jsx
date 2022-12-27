import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { baseURL } from '../../../../../../utils/useAxios';


const useStyles = makeStyles({
});


const RoomCard = ({ room }) => {
    const history = useHistory();
    const classes = useStyles();

    return (

        <Card
            sx={{
                m: 2,
                display: "flex",
                borderRadius: "10px",
                maxWidth: "80%",
            }}
        >
            <Grid container>
                {/* <Grid item sm={12} xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <CardMedia
                        component="img"
                        image={room.images.length > 0 ? `${baseURL}` + room.images[0]?.image : null}
                        alt="image"
                    />
                </Grid> */}
                <Grid item sm={12} xs={12} md={12}>
                    <CardContent>

                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}

export default RoomCard;
