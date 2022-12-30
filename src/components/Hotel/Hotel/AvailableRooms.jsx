import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  roomTitle: {
    fontSize: "16px",
    height: "50px",
    width: "100%",
  },
  roomInformation: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  cardContent: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "10px",
    marginLeft: "20px",
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  betweenLines: {
    borderLeft: "1px solid #dedede",
  },
  horizontalLine: {
    border: "none",
    height: "1px",
    backgroundColor: "#dedede",
    width: "100%",
  },
  reserveButton: {
    marginTop: "1px",
    marginBottom: "1px",
    backgroundColor: "#3b82f6",
    marginRight: "2px",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
}));

export default function AvailableRooms({ availableRooms, fromTime, toTime }) {
  const classes = useStyles();
  const history = useHistory();

  const calculateNumberOfNightstoStay = (fromTime, toTime) => {
    const fromTimeDate = new Date(fromTime);
    const toTimeDate = new Date(toTime);
    const diffTime = Math.abs(toTimeDate - fromTimeDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e, room) => {
    e.preventDefault();
    history.push("/hotel-reservation", {
      room: room,
      fromTime: fromTime,
      toTime: toTime,
      finalPrice: calculateNumberOfNightstoStay(fromTime, toTime) * room.price_per_night,
    });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {availableRooms.map((room) => (
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            key={room.id}
            sx={{ marginRight: "100px" }}
          >
            <form>
              <Card sx={{ display: "flex", marginRight: "2px" }}>
                <div className={classes.cardHeader}>
                  <div className={classes.roomTitle}>
                    <CardHeader
                      title={room.room_title}
                      sx={{ fontSize: "20px" }}
                    />
                  </div>
                  <hr className={classes.horizontalLine} />
                  <div className={classes.roomInformation}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        قیمت هرشب: {room.price_per_night} تومان
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        تعداد تخت های اتاق: {room.bed_count} عدد
                      </Typography>
                    </CardContent>
                  </div>
                </div>
                <div className={classes.betweenLines}></div>
                <div className={classes.cardContent}>
                  <CardActions className={classes.cardActions}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginBottom: "15px", marginTop: "10px" }}
                    >
                      {room.price_per_night *
                        calculateNumberOfNightstoStay(fromTime, toTime)}{" "}
                      تومان
                    </Typography>
                    <button
                      onClick={(e) => handleSubmit(e, room)}
                      className={classes.reserveButton}
                    >
                      رزرو اتاق
                    </button>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: "15px" }}
                    >
                      قیمت برای{" "}
                      {calculateNumberOfNightstoStay(fromTime, toTime)} شب
                    </Typography>
                  </CardActions>
                </div>
              </Card>
            </form>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
