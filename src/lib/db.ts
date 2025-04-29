import * as fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

let exists = fs.existsSync("./tmp/database.db");

export let db = await open({
    filename: "./tmp/database.db",
    driver: sqlite3.Database
});

if (!exists) {
    await db.exec(`
		CREATE TABLE plants (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			species TEXT NOT NULL,
			location TEXT,
			lastWatered TEXT,
			wateringInterval INTEGER,
			notes TEXT
		);
	`);
}
