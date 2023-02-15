import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();

  const LogOutHandler = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/pages"
                style={{ textDecoration: "none", color: "white" }}
              >
                News
              </Link>
            </Typography>
            <Button color="inherit" onClick={LogOutHandler}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ m: 3 }} className="layout-content">
        {props.children}
      </Box>
    </div>
  );
};

export default Layout;
