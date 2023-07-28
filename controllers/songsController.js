const express = require("express");
const router = express.Router();

const {
  getAllSongs,
  getSongById,
  createSong,
  deleteSong,
  updateSongById,
} = require("../queries/songs");

const {
    checkName,
    checkIsFavorite,
    checkArtist
} = require("../validations/checkSongs")

router.get("/", async (req, res) => {
  const allSongs = await getAllSongs();

  if (Array.isArray(allSongs)) {
    res.json(allSongs);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const foundSong = await getSongById(id);

  if (foundSong[0]) {
    res.json(foundSong[0]);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", checkName, checkArtist, checkIsFavorite, async (req, res) => {
  const createdSong = await createSong(req.body);

  res.json(createdSong);
});

router.delete("/:id", async (req, res) => {
  const deletedSong = await deleteSong(req.params.id);

  if (deletedSong.data.length === 0) {
    return res.status(404).json({ message: "no data found!", error: true });
  } else {
    res.json(deletedSong);
  }
});

router.put("/:id", checkName, checkArtist, checkIsFavorite, async (req, res) => {
  const updatedSong = await updateSongById(req.params.id, req.body);

  if (updatedSong.data) {
    res.json(updatedSong);
  } else {
    res.status(404).json({ message: "no data found!", error: true });
  }
});

module.exports = router;
