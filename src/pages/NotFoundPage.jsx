import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import NavBar from "../components/NavBar/newNavBar";
import { Container, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  pageNotFoundImage: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "600px",
    height: "220px",
    margin: "0 auto",
    marginTop: "20%",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container>
        <NavBar />
        <Grid item xs={12}>
          <img
            className={classes.pageNotFoundImage}
            src="https://cdn.alibaba.ir/h2/desktop/assets/images/error/404-alibaba-a830dd70.png"
            alt="pageNotFound"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            sx={{ marginTop: "50px", fontWeight: "bold" }}
          >
            صفحه مورد نظر در دسترس نمی‌باشد
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ marginTop: "10px", fontSize: "15px", color: "#6C7680" }}
          >
            متاسفانه خطایی هنگام انتقال درخواست شما رخ داده است
            <br />
            برای پیدا کردن مسیر درست میتوانید سری به
            <Link to="/" sx={{ backgroundColor: "#000000" }}>
              {" "}
              صفحه اصلی دکترینو{" "}
            </Link>
            بزنید
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
