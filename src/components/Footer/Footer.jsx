import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "80px",
        width: "100%",
        minWidth: "100px",
        height: 'auto'
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#F2F2F2",
          paddingTop: "40px",
          paddingBottom: "40px",
          margin: "0px",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "right",
            marginRight: "35px",
            marginLeft: "35px",
          }}
        >
          <Typography
            varient="h2"
            sx={{
              color: "#000",
              fontSize: "22px",
            }}
          >
            <BusinessIcon />
            دکترینو
          </Typography>
          <Typography
            varient="h6"
            sx={{
              color: "#000",
              fontSize: "15px",
              padding: "10px",
              paddingRight: "10px",
              justifyContent: "flex-end"
            }}
          >
            در زندگی پر مشغله ی امروز اکثر ما زمان زیادی برای رسیدگی به سلامتی و
            سبک زندگی سالم نداریم
            <br />
            حتی وقتی بیمار میشویم باید ساعت ها برای پیدا کردن دکتر مناسب و نوبت
            گیری زمان صرف کنیم
            <br />
            دکترینو برای شما امکانی فراهم میکند که به خدمات پزشکی در کمترین زمان
            دسترسی داشته باشید.
            <br />
            خدماتی که در سایت دکترینو ارائه می شود عبارتند از: نوبت دهی پزشکی و
            رزرو هتل در محدوده مطب پزشک درصورت نیاز
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "right",
            marginLeft: "35px",
          }}
        >
          <Typography varient="h5">لینک های مفید</Typography>
          <br />
          <Typography>
            <a
              href="/about-us"
              style={{
                textDecoration: "none",
              }}
            >
              درباره ما
            </a>
          </Typography>
          <br />
          <Typography>
            <a
              href="/"
              style={{
                textDecoration: "none",
              }}
            >
              صفحه اصلی
            </a>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "right",
            marginLeft: "35px",
          }}
        >
          <Typography varient="h5">ارتباط با ما</Typography>
          <br />
          <Typography>
            <LocationOnIcon
              sx={{
                fontSize: "20px",
                color: "#0080ff",
              }}
            />
            تهران، نارمک، دانشگاه علم و صنعت ایران، دانشکده کامپیوتر
          </Typography>
          <br />
          <Typography>
            <PhoneIcon
              sx={{
                fontSize: "20px",
                color: "#0080ff",
              }}
            />
            021-12345678
          </Typography>
          <br />
          <Typography>
            <EmailIcon
              sx={{
                fontSize: "20px",
                color: "#0080ff",
              }}
            />
            info@doctorino.ir
          </Typography>
        </Grid>
        <hr
          width="100%"
          style={{
            backgroundColor: "#000",
            marginBottom: "1rem",
            marginTop: "1rem",
            marginLeft: "35px",
            marginRight: "35px",
          }}
        />

        <Grid
          sx={{
            marginRight: "35px",
            marginLeft: "35px",
            // color: "#dedede",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          © 2021 کلیه طرح و حقوق متعلق به دکترینو است.
        </Grid>
      </Grid>
    </Container>
  );
}
