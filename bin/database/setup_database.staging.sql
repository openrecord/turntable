DROP DATABASE IF EXISTS openrecord;
CREATE DATABASE openrecord DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- TODO: Enter your desired user and password here for the staging database.
GRANT ALL ON openrecord.* to ''@'%' IDENTIFIED BY '';
FLUSH PRIVILEGES;