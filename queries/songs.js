const db = require("../db/dbConfig");

const getAllSongs = async () => {
    try {
        const allSongs = await db.any("SELECT * FROM songs");

        return allSongs;
    } catch (error) {
        return error;
    }
};


async function getSongById(id) {
    try {
        const foundSong = await db.any(`SELECT * FROM songs WHERE id = $1`, id);

        return foundSong;
    } catch (error) {
        return error;
    }
}

const createSong = async (data) => {
    try {
        const newSong = await db.one(
            "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [data.name, data.artist, data.album, data.time, data.is_favorite]
        );

        return newSong;
    } catch (error) {
      return error;
    }
}

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.any(
            "DELETE FROM songs WHERE id = $1 RETURNING *",
            [id]
        );

        return { status: "successful", data: deletedSong };
    } catch (error) {
        return { status: "failed", err: error};
    }
};

const updateSongById = async (id, data) => {
    try {
        const originalSong = await db.any("SELECT * FROM songs WHERE id = $1", [id])

        let combinedSong = {
            ...originalSong[0],
            ...data
        }

        const updatedSong = await db.one(
            "UPDATE songs SET name = $1, artist = $2, album = $3, time = $4, is_favorite = $5 WHERE id = $6 RETURNING *",
            [combinedSong.name, combinedSong.artist, combinedSong.album, combinedSong.time,combinedSong.is_favorite, id]
        );

        return { status: "success!", data: updatedSong };
    } catch (error) {
        return { status: "failed", err: error};
    }
}

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    deleteSong,
    updateSongById
};