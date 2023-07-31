DROP DATABASE IF EXISTS songs_dev;

CREATE DATABASE songs_dev;

\c songs_dev;

DROP TABLE IF EXISTS albums;

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title TEXT,
    artist TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5)
);

DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN,
    album_id INTEGER REFERENCES albums (id)
    ON DELETE CASCADE
);