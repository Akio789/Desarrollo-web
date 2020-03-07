/*----------------------------------------------------------
 * Práctica 4: Utilizando Express
 * Fecha: 12-Mar-2020
 * Autora: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

var express = require('express');
var router = express.Router();

/**
 * GET home page.
 * Routes to index.ejs
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/**
 * GET hola page.
 * Takes the given name name (nombre) in the route and redirects to 
 * hola.ejs, a webpage that greets the user with the name that was given.
 */
router.get('/hola/:nombre?', (req, res) => {
  const nombre = req.params.nombre || 'Mundo';
  res.render('hola', { nombre });
});

/**
 * Function's code based on:
 * Reid, M. (2019). Exploring The Look and Say Sequence Using Javascript. 
 * March 7th, 2020, from Medium. Retrived from: 
 * https://medium.com/@matthew.reid.os1/exploring-the-look-and-say-sequence-using-javascript-6a1aee8a88a3
 * 
 * Generates the Conway's look and say sequence for a given number represented as a string
 * @param {string} digits the number as a string from which the sequence will be generated
 * @return {string} the new generated sequence
 */
const lookAndSay = (digits) => {
  let sequence = '';
  let chars = (digits + ' ').split('');
  let lastChar = chars[0];
  let count = 0;
  chars.forEach(char => {
    if (char === lastChar) {
      count++;
    } else {
      sequence += (count + '') + lastChar;
      lastChar = char;
      count = 1;
    }
  });
  return sequence;
};

/**
 * Function's code based on:
 * Reid, M. (2019). Exploring The Look and Say Sequence Using Javascript. 
 * March 7th, 2020, from Medium. Retrived from: 
 * https://medium.com/@matthew.reid.os1/exploring-the-look-and-say-sequence-using-javascript-6a1aee8a88a3
 * 
 * Generates all the Conway's look and say sequences from 1 to a given number.
 * @param {int} number the number of sequences that will be generated
 * @return {string[]} contains all the sequences
 */
const runLookAndSay = number => {
  let sequences = [];
  let start = '1';
  for (let i = 0; i < number; i++) {
    sequences.push(start);
    start = lookAndSay(start);
  }
  return sequences;
};

/**
 * GET conway page.
 * Takes the given number in the route, generates the
 * corresponding Conway's look and say sequences and 
 * redirects to lookAndSay.ejs, where the sequences are 
 * shown to the user through an ordered list.
 */
router.get('/conway/:number', (req, res) => {
  const number = parseInt(req.params.number);
  const sequences = runLookAndSay(number);
  res.render('conway', { number, sequences });
});