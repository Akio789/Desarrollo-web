/*----------------------------------------------------------
 * Práctica 3: Utilizando promesas y XML
 * Fecha: 05-Mar-2020
 * Autor: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();
const createReadFilePromise = util.promisify(fs.readFile);
const createParseXmlPromise = util.promisify(parser.parseString);

/**
 * Reads an XML file and parses it into JSON data.
 * @param {string} path The path of the XML file to read from
 * @return {Promise<Object>} Resolves into the JSON data converted from XML
 */
async function getJsonFromXmlFile(path) {
  let xmlData = await createReadFilePromise(path);
  return await createParseXmlPromise(xmlData);
}

/**
 * Formats a 'movie' object into a string with the movie name,
 * followed by it's cast with each actor in a new line and indented
 * with two whitespaces. If the movie has no cast registered, the 
 * string will only be the name of the movie.
 * The string will have a blank new line at the end.
 * @param {Object} movie Object that contains the movie data
 * @return {string} The formatted string for the movie's cast
 */
function formatMovieCast(movie) {
  let name = movie['$']['name'];
  let formattedCast = `${name}\n`;
  if ('cast' in movie) {
    let cast = movie['cast'];
    cast.forEach(actor => {
      actor = actor.trim();
      formattedCast += `  ${actor}\n`
    })
  }
  return formattedCast;
}

/**
 * Reads movies from an XML file and prints the movie name and it's cast 
 * through standard output.
 * The movie cast is represented by it's actors names, each in a new line and 
 * indented with two whitespaces. If the movie has no cast registered, only the 
 * movie name is shown.
 * Every movie name/cast set has a blank new line at the end.
 * @return {Promise<undefined>}
 */
async function printCastWithFormat() {
  try {
    let movies = (
      await getJsonFromXmlFile(`${__dirname}/movies.xml`)
    )['movies']['film'];
    let formattedMoviesCast = movies.map(movie => formatMovieCast(movie))
    console.log(formattedMoviesCast.join('\n'));
  } catch (err) {
    console.log(err);
  }
}

printCastWithFormat();