/*----------------------------------------------------------
 * Práctica 5: Utilizando SQLite
 * Fecha: 19-Mar-2020
 * Autora: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

let express = require('express');
let router = express.Router();

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('super.db');

/**
 * Makes a query to read the database and returns that information.
 * @param {string} sql The query to be made
 * @return {Promise<Object[]>} Resolves into an array of the row objects
 */
function makeQuery(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  let sql = `
    select * 
    from superheroes
    order by "Sexo" asc, "Identidad secreta" asc;
  `;
  try {
    let rows = await makeQuery(sql);
    res.render('index', { rows });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
