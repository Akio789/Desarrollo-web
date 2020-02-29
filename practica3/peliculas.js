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
 * Formats a 'movie' object into a string with its name, followed by
 * the year of release and it's director if it's registered. For example:
 * 'Example movie (1990), director: John Smith'
 * or 'Example movie (1990)' if the director isn't registered
 * @param {Object} movie Object that contains the movie data
 * @return {string} The formatted string to represent a movie
 */
function formatMovie(movie) {
  let name = movie['$']['name'];
  let year = movie['$']['year'];
  let movieDescription = `${name} (${year})`;
  if ('director' in movie) {
    let director = movie['director'][0].trim();
    movieDescription += `, director: ${director}`;
  }
  return movieDescription;
}

/**
 * Reads movies from an XML file and prints them through standard output
 * in the following format: Example movie (1990), director: John Smith.
 * Every movie will be printed in a new line and if the movie doesn't
 * have a director registered, that part of the string won't be shown.
 * @return {Promise<undefined>}
 */
async function printMoviesWithFormat() {
  try {
    let movies = (
      await getJsonFromXmlFile(`${__dirname}/movies.xml`)
    )['movies']['film'];
    let formattedMovies = movies.map(movie => formatMovie(movie));
    console.log(formattedMovies.join('\n'));
  } catch (err) {
    console.log(err);
  }
}

printMoviesWithFormat();