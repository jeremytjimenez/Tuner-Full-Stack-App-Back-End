const db = require("../db/dbConfig");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any(`SELECT * FROM songs`);

    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSongById = async (id) => {
  try {
    const oneSong = await db.any(`SELECT * FROM songs WHERE id = $1`, id);
    // const oneReview = await db.any(
    //   `
    //     SELECT ALBUM_ID,
    //         REVIEWER,
    //         TITLE,
    //         CONTENT,
    //         RATING
    //     FROM ALBUMS
    //     JOIN SONGS ON ALBUMS.ID = SONGS.ALBUM_ID
    //     WHERE ALBUMS.ID = $1
    //         AND SONGS.ID = $2;
    // `,
    //   [albumId, songId]
    // );

    return oneSong;
  } catch (error) {
    return error;
  }
};

const deleteSongById = async (id) => {
  try {
    const deleteSong = await db.any(
      `DELETE FROM songs WHERE id = $1 RETURNING *`,
      id
    );

    return deleteSong;
  } catch (error) {
    return error;
  }
};

const createSong = async (song) => {
  try {
    const newSong = await db.any(
      `INSERT INTO songs (name, artist, album, time, is_favorite, album_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        song.name,
        song.artist,
        song.album,
        song.time,
        song.is_favorite
      ]
    );

    return newSong;
  } catch (error) {
    return error;
  }
};

const updateSongById = async (id, song) => {
  let { name, artist, is_favorite } = song;
  try {
    const updatedSong = await db.any(
      `UPDATE songs SET name = $1, artist = $2, is_favorite = $3 WHERE id = $4 RETURNING *`,
      [name, artist, is_favorite, id]
    );

    return updatedSong;
  } catch (error) {
    return error;
  }
};

const getAllSongsOnAlbumId = async (album_id) => {
  try {
    // const allReviews = await db.any(
    //   `SELECT * FROM reviews WHERE bookmark_id = $1 RETURNING *`,
    //   bookmark_id
    // );

    const allSongs = await db.any(
      `SELECT * FROM albums INNER JOIN songs ON songs.album_id = albums.id WHERE songs.album_id = $1 `,
      album_id
    );

    // `SELECT * FROM reviews WHERE exists (select * from bookmarks WHERE $1 = reviews.bookmark_id)`

    return allSongs;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  deleteSongById,
  createSong,
  updateSongById,
  getAllSongsOnAlbumId,
};
