const express = require("express");
const axios = require("axios");
const cors = require("cors");
const md5 = require("md5");
const uid2 = require("uid2");
require("dotenv").config();

const app = express();
app.use(cors());

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
