import React, { useState, useEffect } from "react";
import Layout from "../Component/Layout";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [jobDesk, setJobDesk] = useState("");
  const [location, setLocation] = useState("");
  const [fulltime, setFulltime] = useState(false);
  const [values, setValues] = useState(0);
  const [search, setSearch] = useState(null);

  const currentToken = localStorage.getItem("access_token");

  const handleFulltime = () => {
    setFulltime((prevTime) => !prevTime);
    setValues((prev) => (prev === 0 ? 1 : 0));
  };

  const jobDeskOnChange = (e) => {
    setJobDesk(e.target.value);
    console.log(jobDesk);
  };

  const locationOnChange = (e) => {
    setLocation(e.target.value);
    console.log(location);
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${currentToken}`,
    },
  };

  console.log("cuurs", axiosConfig);

  const getAPI = async () => {
    await axios
      .get("http://localhost:5000/jobs?page=" + page, axiosConfig)
      .then((res) => {
        console.log("set data", res.data.content);
        setData(res.data.content);
      });
  };

  const getBySearch = () => {
    axios
      .get(
        `http://localhost:5000/jobs/jobs/search?desc=${jobDesk}&location=${location}&fulltime=${values}`,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
      .then((res) => {
        console.log("set search", res.data);
        setSearch(res.data);
        setData(res.data);
      });
  };

  const pagingPrevHandler = () => {
    setPage(page - 1);
  };

  const pagingHandler = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getAPI();
  }, [page]);
  return (
    <Layout>
      <Box className="dashboard-search">
        <Grid container justifyContent="center" alignItems="center">
          <Box sx={{ m: 3 }}>
            <label> Job Description</label>
            <TextField
              fullWidth
              id="fullWidth"
              type="text"
              placeholder="Enter Your Job Description"
              value={jobDesk}
              onChange={jobDeskOnChange}
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <label> Location</label> <br />
            <TextField
              fullWidth
              id="fullWidth"
              type="text"
              placeholder="Enter Your Job Description"
              value={location}
              onChange={locationOnChange}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              alignItems: "center",
              m: 3,
            }}
          >
            <Box sx={{ mx: 3 }}>
              <label> Fulltime</label>
              <Checkbox
                checked={fulltime}
                onChange={handleFulltime}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
            <Box>
              <Button type="submit" variant="contained" onClick={getBySearch}>
                Search
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Box
        className="data-list"
        sx={{ backgroundColor: "white", boxShadow: 3, p: 1 }}
      >
        <Box sx={{ ml: 2 }} className="job-content">
          <h1> Job List</h1>
        </Box>
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: 2,
              borderColor: "#eeeeee",
              padding: 2,
            }}
          >
            <Box className="left-info" sx={{ lineHeight: "30px" }}>
              <Link to={`/pages/${item.id}`} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 700, color: "#2196f3" }}
                >
                  {item.title}
                </Typography>
              </Link>

              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ fontWeight: 500, color: "#9e9e9e" }}
                >
                  {item.desc} -
                </Typography>

                {item.fulltime === true ? (
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ fontWeight: 700, color: "#4caf50", ml: 1 }}
                  >
                    Full Time
                  </Typography>
                ) : (
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ fontWeight: 700, color: "#4caf50", ml: 1 }}
                  >
                    Part Time
                  </Typography>
                )}
              </Box>
            </Box>
            <Box className="right-info" sx={{ lineHeight: "30px" }}>
              <Typography
                variant="p"
                component="p"
                sx={{ fontWeight: 500, color: "black" }}
              >
                {item.location}
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ fontWeight: 500, color: "#9e9e9e" }}
              >
                {item.createdAt}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box className="pagination-button">
          {page === 1 ? (
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1, fontWeight: 700, backgroundColor: "#4caf50" }}
              onClick={pagingPrevHandler}
            >
              {" "}
              Prev Jobs{" "}
            </Button>
          ) : null}
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 1, fontWeight: 700 }}
            onClick={pagingHandler}
          >
            {" "}
            More Jobs{" "}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Dashboard;
