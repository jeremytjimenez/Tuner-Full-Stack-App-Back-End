const express = require("express");
const router = express.Router();

const {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  deleteAlbum,
  updateAlbumById,
} = require("../queries/albums");

// const {
//     checkName,
//     checkIsFavorite,
//     checkArtist
// } = require("../validations/checkSongs")

router.get("/", async (req, res) => {
  const allAlbums = await getAllAlbums();

  if (Array.isArray(allAlbums)) {
    res.json(allAlbums);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const foundAlbum = await getAlbumById(id);

  if (foundAlbum[0]) {
    res.json(foundAlbum[0]);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const createdAlbum = await createAlbum(req.body);

  res.json(createdAlbum);
});

router.delete("/:id", async (req, res) => {
  const deletedAlbum = await deleteAlbum(req.params.id);

  if (deletedAlbum.data.length === 0) {
    return res.status(404).json({ message: "no data found!", error: true });
  } else {
    res.json(deletedAlbum);
  }
});

router.put("/:id", async (req, res) => {
  const updatedAlbum = await updateAlbumById(req.params.id, req.body);

  if (updatedAlbum.data) {
    res.json(updatedAlbum);
  } else {
    res.status(404).json({ message: "no data found!", error: true });
  }
});

module.exports = router;
