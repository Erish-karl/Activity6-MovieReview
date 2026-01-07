BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "movie" (
	"id"	integer NOT NULL,
	"title"	varchar NOT NULL,
	"description"	varchar NOT NULL,
	"rating"	float NOT NULL DEFAULT (0),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "review" (
	"id"	integer NOT NULL,
	"rating"	float NOT NULL,
	"movieId"	integer,
	"reviewer"	varchar NOT NULL,
	"comment"	varchar NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "FK_4ccf71f9d14aa1a059877b06343" FOREIGN KEY("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "movie" VALUES (1,'Inception','A mind-bending thriller about dreams within dreams.',3.0);
INSERT INTO "movie" VALUES (2,'The Matrix','A hacker discovers the shocking truth about reality.',0.0);
INSERT INTO "movie" VALUES (3,'Interstellar','A team travels through a wormhole in search of a new home for humanity.',5.0);
INSERT INTO "movie" VALUES (4,'The Godfather','The aging patriarch of an organized crime dynasty transfers control to his son.',0.0);
INSERT INTO "movie" VALUES (5,'Avengers: Endgame','Superheroes unite to undo the catastrophic events caused by Thanos.',0.0);
INSERT INTO "review" VALUES (1,2.0,1,'erish','ok naman');
INSERT INTO "review" VALUES (2,4.0,1,'karl','palag na
');
INSERT INTO "review" VALUES (3,5.0,3,'sad','awit');
COMMIT;
