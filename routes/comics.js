const express = require("express");
const axios = require("axios");
const cors = require("cors");
const md5 = require("md5");
const uid2 = require("uid2");
const router = express.Router();

require("dotenv").config();

const app = express();
app.use(cors());

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

router.get("/comics/:page", async (req, res) => {
  try {
    let offset = 100 * (req.params.page - 1);
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?orderBy=title&limit=100&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comic/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comic/:id/characters", async (req, res) => {
  let id = req.params.id;
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comicsBySearch/:search?", async (req, res) => {
  let search = req.params.search;
  let query = "?";
  if (search !== undefined) {
    query = query + "titleStartsWith=" + search + "&";
  }
  try {
    const ts = uid2(8);
    const hash = md5(ts + privateKey + publicKey);

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics${query}orderBy=title&limit=100&&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
