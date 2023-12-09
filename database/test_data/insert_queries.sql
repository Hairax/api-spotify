INSERT INTO spotify.music
(id, music_genre, "name", authors, "year", is_active, created_date)
VALUES(uuid_generate_v4(), 1, 'Easy on me', 'Adele', 2021, true, CURRENT_TIMESTAMP(3));

INSERT INTO spotify.music
(id, music_genre, "name", authors, "year", is_active, created_date)
VALUES(uuid_generate_v4(), 2, 'La mordidita', 'Ricky Martin', 2015, true, CURRENT_TIMESTAMP(3));

INSERT INTO spotify.music
(id, music_genre, "name", authors, "year", is_active, created_date)
VALUES(uuid_generate_v4(), 5, 'I will survive', 'Gloria Gaynor', 1978, false, CURRENT_TIMESTAMP(3));

INSERT INTO spotify.music
(id, music_genre, "name", authors, "year", is_active, created_date)
VALUES(uuid_generate_v4(), 1, 'Harry Styles', 'As it was', 2022, true, CURRENT_TIMESTAMP(3));
