/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE workout_planner_db;
USE workout_planner_db;

-- Create the table plans.
CREATE TABLE exercises
(
id int NOT NULL AUTO_INCREMENT,
movie varchar(255) NOT NULL,
PRIMARY KEY (id)
completed BOOLEAN NOT NULL,
);

-- Insert a set of records.
INSERT INTO exercises (exercise) VALUES ('20 Pushups');