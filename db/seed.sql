\c songs_dev;

INSERT INTO
    albums(title, artist, rating)
VALUES
('Chrono Trigger', 'Yasunori Mitsuda', 5),
('Blade Runner', 'Vangelis', 4),
('The Stone Roses', 'The Stone Roses', 3),
('Innvervisions', 'Stevie Wonder', 4);

INSERT INTO
    songs(name, artist, album, time, is_favorite, album_id)
VALUES
('Wind Scene', 'Yasunori Mitsuda', 'Chrono Trigger', '3:21', true, 1),
('Secret of the Forest', 'Yasunori Mitsuda', 'Chrono Trigger', '3:21', true, 1),
('Manoria Cathedral', 'Yasunori Mitsuda', 'Chrono Trigger', '1:13', false, 1),
('Too High', 'Stevie Wonder', 'Innervisions', '4:37', false, 4),
('Wait For Me', 'Vangelis', 'Blade Runner', '5:27', true, 2),
('I Wanna Be Adored', 'The Stone Roses', 'The Stone Roses', '4:52', false, 3);