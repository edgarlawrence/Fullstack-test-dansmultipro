import React, { useState, useEffect } from "react";
import Layout from "../Component/Layout";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

function PageDetails() {
  const [data, setData] = useState({});
  const id = useParams();
  const currentToken = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${currentToken}`,
  };

  const getId = async () => {
    await axios
      .get(`http://localhost:5000/jobs/${id.id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getId();
  }, []);

  console.log("images", data.images);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIcon sx={{ width: 50 }} />
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 700, color: "#2196f3" }}
              >
                Back
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
      <Grid container sx={{ pl: 6 }}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, color: "#455a64" }}
          >
            {data.title}
          </Typography>
          <Divider
            sx={{
              border: 1,
              borderColor: "lightgrey",
              my: 2,
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          px: 6,
        }}
      >
        <Grid item xs={12} md={6} className="left-content">
          <Box className="company-profile" sx={{ my: 2 }}>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 700, color: "black", fontWeight: 700 }}
            >
              Trade Republic is Eurpoe's first commision-free mobile broker
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "#9e9e9e" }}
            >
              {data.companyprofile}
            </Typography>
          </Box>

          <Box className="company-works" sx={{ my: 2 }}>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 700, color: "black", fontWeight: 700 }}
            >
              What you'll be doing
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "#9e9e9e" }}
            >
              {data.yourtask}
            </Typography>
          </Box>

          <Box className="company-require" sx={{ my: 2 }}>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 700, color: "black", fontWeight: 700 }}
            >
              What you'll be doing
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{ fontWeight: 500, color: "#9e9e9e" }}
            >
              {data.requirements}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="right-content">
          <Box
            sx={{
              backgroundColor: "#e0e0e0",
              textAlign: "center",
              width: "20rem",
              ml: 10,
              boxShadow: 10,
              borderRadius: "5px",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontWeight: 700 }}> Trade Republic </div>
              <Box sx={{ color: "#42a5f5", fontWeight: 700 }}>1 other job</Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            ></Box>
            <Box
              className="imgs"
              sx={{
                boxShadow: 3,
                textAlign: "center",
              }}
            ></Box>
            <Box
              component="img"
              src={`http://localhost:5000/${data.images}`}
              alt={data.images}
              sx={{ width: "10rem" }}
            />
            <Box sx={{ my: 2 }}>
              <a href="#"> www.tradepublic.com</a>
            </Box>
          </Box>
          <Box
            className="apply"
            sx={{
              backgroundColor: "#ffd54f",
              textAlign: "left",
              mx: 10,
              my: 3,
              px: 5,
              py: 2,
              backgroundColor: "#e0e0e0",
              boxShadow: 10,
              borderRadius: "5px",
              width: "17rem",
            }}
          >
            <Box>
              <p> How to apply</p>
            </Box>
            <Divider sx={{ mx: 1 }} />
            <Box>
              <p>
                {" "}
                Email your resume to<a href="#">join@traderoute.com</a> or apply
                directly at <br /> <a href="#"> http.//traderepublic.com </a>{" "}
              </p>
            </Box>
            <Box />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default PageDetails;
