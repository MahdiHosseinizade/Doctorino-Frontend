import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AvailableRooms({ availableRooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    // <div>
    //   <h2>Available Rooms</h2>
    //   <ul>
    //     {availableRooms.map((room) => (
    //       <li key={room.id}>
    //         <button onClick={() => setSelectedRoom(room.id)}>
    //           {room.name}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   {selectedRoom && <p>Selected Room: {selectedRoom}</p>}
    // </div>
    <Container>
      <Grid container spacing={2}>
        {availableRooms.map((room) => (
          <Grid
            item
            // container
            xs={12}
            sm={10}
            md={8}
            key={room.id}
            sx={{ display: "flex" }}
          >
            <Card>
              <div>
                {/* <Grid item xs={12} md={3}> */}
                <CardHeader title={room.room_title} sx={{ fontSize: "20px" }} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    قیمت هرشب: {room.price_per_night} تومان
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    تعداد تخت های اتاق: {room.bed_count} عدد
                  </Typography>
                </CardContent>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={12} md={3}> */}
              <div>
                <CardActions>
                  {/* <Typography variant="body2" color="text.secondary">
                   */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    رزرو اتاق
                  </Button>
                </CardActions>
              </div>
              {/* </Grid> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
