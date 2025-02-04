const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./configs/db");
db();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(
  cors({
    origin: process.env.CORS_URI, 
    credentials: true, 
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/", require("./routes"));


const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  console.log("App Started at PORT ", APP_PORT);
});
