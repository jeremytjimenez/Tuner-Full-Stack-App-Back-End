const pgp = require("pg-promise")();
require("dotenv").config();

// taking env variables

const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
};

// returns an object

const db = pgp(cn)

// just to show that connection is established

db.connect()
  .then((obj) => {
    console.log("Postgres connection established");
    obj.done();
  })
  .catch((e) => {
    console.log("ERROR:", e.message || e);
  });

module.exports = db;