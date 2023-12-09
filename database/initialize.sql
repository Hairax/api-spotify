CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
COMMENT ON EXTENSION citext IS 'provides a case-insensitive character string type';

-- This script validates the existance of the spotify role/user
-- Following scripts will use the spotify to setup permissions and ownership on tables and views.
-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='spotify') THEN 
--         raise exception 'Custom Error: Spotify user does not exist, please create it';
--     END IF;
-- END$$;

-- add spotify schema
--
-- TOC entry 20 (class 2615 OID 2771408)
-- Name: spotify; Type: SCHEMA; Schema: -; Owner: spotify
--
CREATE SCHEMA spotify;
-- ALTER SCHEMA spotify OWNER TO spotify;
-- SET default_tablespace = '';

-- -- add music_genre table
CREATE table if not exists spotify.music_genre (
    id smallint NOT NULL,
    name character varying(10) NOT NULL,
    CONSTRAINT spotify_pk PRIMARY KEY (id),
    CONSTRAINT spotify_id_filled CHECK ((id <> 0))
);

-- ALTER TABLE spotify.music_genre;
-- COMMENT ON TABLE spotify.music_genre IS 'A category that brings together musical compositions that share different criteria of affinity.';

INSERT INTO spotify.music_genre (id,"name") VALUES
	 (1,'Pop'),
	 (2,'Latin'),
	 (3,'Rock'),
     (4,'Country'),
     (5,'Disco'),
     (6, 'Hip hop');

-- add music table
CREATE TABLE IF NOT EXISTS spotify.music (
	id uuid NOT NULL default public.uuid_generate_v4(),
    music_genre smallint NOT NULL,	
	name character varying(36) NOT NULL,
	authors character varying(50) NOT NULL,
    year integer NOT NULL,
	is_active boolean NOT NULL,
	created_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	CONSTRAINT music_pk PRIMARY KEY (id),
    CONSTRAINT music_genre_fk FOREIGN KEY (music_genre) REFERENCES spotify.music_genre(id)
);

-- add user table
CREATE TABLE IF NOT EXISTS spotify.user (
	id uuid NOT NULL default public.uuid_generate_v4(),
	user_name character varying(36) NOT NULL,
	country character varying(50) NOT NULL,
    age integer NOT NULL,
	is_active boolean NOT NULL,
	created_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

-- add playlist table
CREATE TABLE IF NOT EXISTS spotify.playlist (
	id uuid NOT NULL default public.uuid_generate_v4(),
	name character varying(36) NOT NULL,
	user_id uuid NOT NULL,
	music_id uuid NOT NULL,
	is_active boolean NOT NULL,
	created_date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP(3) NOT NULL,
	CONSTRAINT playlist_pk PRIMARY KEY (id),
    CONSTRAINT playlist_user_fk FOREIGN KEY (user_id) REFERENCES spotify.user(id),
    CONSTRAINT playlist_music_fk FOREIGN KEY (music_id) REFERENCES spotify.music(id)
);

-- Permissions
-- ALTER TABLE spotify.music OWNER TO spotify;
-- ALTER TABLE spotify.user OWNER TO spotify;
-- ALTER TABLE spotify.playlist OWNER TO spotify;

--
-- Name: music_name_idx; Type: INDEX; Schema: spotify;
--
CREATE INDEX IF NOT EXISTS music_name_idx ON spotify.music USING btree (name);
CREATE INDEX IF NOT EXISTS user_name_idx ON spotify.user USING btree (user_name);
CREATE INDEX IF NOT EXISTS playlist_name_idx ON spotify.playlist USING btree (name);