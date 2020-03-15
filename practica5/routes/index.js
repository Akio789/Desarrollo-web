/*----------------------------------------------------------
 * Práctica 5: Utilizando SQLite
 * Fecha: 19-Mar-2020
 * Autora: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('super.db');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let sql = 'select * from superheroes;';

  db.all(sql, [], (err, rows) => {
    if (err) throw err;
    rows.forEach((row) => {
      res.render('index', { rows });
    });
  });
});

module.exports = router;
