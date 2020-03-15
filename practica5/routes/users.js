/*----------------------------------------------------------
 * Práctica 5: Utilizando SQLite
 * Fecha: 19-Mar-2020
 * Autora: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
