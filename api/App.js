const express = require("express");
const db = require("./config/index");
const auths = require("./routes/auth");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
dotenv.config();

try {
  db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/jobs", routes);
app.use(auths);
app.use("/Images", express.static(path.join(__dirname, "./Images")));

app.listen(5000, () => console.log("Server running at port 5000"));
