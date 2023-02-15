import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const data = {
    email: email,
    password: password,
  };

  const loginPost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        console.log(res.data.accessToken);
        localStorage.setItem("access_token", res.data.accessToken);
        setToken(res.data.accessToken);
        if (token) {
          navigate("/pages");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box>
      <Box className="login-title" sx={{ textAlign: "center" }}>
        <h1> Login</h1>
      </Box>
      <Grid container justifyContent="center">
        <form>
          <Grid item xs={12} sx={{ m: 3 }}>
            <TextField
              type="email"
              id="outlined-controlled"
              label="Enter Your Email"
              value={email}
              onChange={emailOnChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ m: 3 }}>
            <TextField
              type="password"
              id="outlined-controlled"
              label="Enter Your Password"
              value={password}
              onChange={passwordOnChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
            <Button onClick={loginPost} variant="contained">
              Sign In
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}

export default Login;
