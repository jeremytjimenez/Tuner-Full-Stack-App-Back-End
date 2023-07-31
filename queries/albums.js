const db = require("../db/dbConfig");

const getAllAlbums = async () => {
    try {
        const allAlbums = await db.any("SELECT * FROM albums");

        return allAlbums;
    } catch (error) {
        return error;
    }
};


async function getAlbumById(id) {
    try {
        const foundAlbum = await db.any(`SELECT * FROM albums WHERE id = $1`, id);

        return foundAlbum;
    } catch (error) {
        return error;
    }
}

const createAlbum = async (data) => {
    try {
        const newAlbum = await db.one(
            "INSERT INTO albums (title, artist, rating) VALUES ($1, $2, $3) RETURNING *", 
            [data.title, data.artist, data.rating]
        );

        return newAlbum;
    } catch (error) {
      return error;
    }
}

const deleteAlbum = async (id) => {
    try {
        const deletedAlbum = await db.any(
            "DELETE FROM album WHERE id = $1 RETURNING *",
            [id]
        );

        return { status: "successful", data: deletedAlbum };
    } catch (error) {
        return { status: "failed", err: error};
    }
};

const updateAlbumById = async (id, data) => {
    try {
        const originalAlbum = await db.any("SELECT * FROM albums WHERE id = $1", [id])

        let combinedAlbum = {
            ...originalAlbum[0],
            ...data
        }

        const updatedAlbum = await db.one(
            "UPDATE albums SET title = $1, artist = $2, rating = $3 WHERE id = $4 RETURNING *",
            [combinedSong.title, combinedSong.artist, combinedSong.rating, id]
        );

        return { status: "success!", data: updatedAlbum };
    } catch (error) {
        return { status: "failed", err: error};
    }
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    deleteAlbum,
    updateAlbumById
};