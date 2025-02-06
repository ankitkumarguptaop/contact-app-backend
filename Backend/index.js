const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./configs/db");
db();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // extended  true is for nested data

app.use(
  cors({
    origin: process.env.CORS_URI,
    credentials: true, // for cookies
  })
);

app.use(express.urlencoded({ extended: false })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files

app.use(cookieParser());
app.use(express.json());

app.use("/", require("./routes"));

const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("App Started at PORT ", APP_PORT);
});
