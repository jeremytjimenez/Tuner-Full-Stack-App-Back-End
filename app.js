const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const songsController = require("./controllers/songsController")

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/songs", songsController)

app.get("/", (req, res) => {
    res.send("welcome");
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;