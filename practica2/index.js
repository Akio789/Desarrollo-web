/*----------------------------------------------------------
 * Práctica 2: Programación asíncrona
 * Fecha: 27-Feb-2020
 * Autor: A01651395 Jorge Akio Olvera Arao
 *----------------------------------------------------------*/

const fs = require('fs');

/**
 * Reads a file containing information about 
 * movies (name, year and director), sorts them 
 * ascendingly by year and writes them into 
 * another file.
 * 
 * @param {string} pathToRead The path of the file to read from
 * @param {string} pathToWrite The path of the file to write into
 * @return {undefined}
 */
function writeSortedMovies(pathToRead, pathToWrite) {
  fs.readFile(pathToRead, (err, data) => {
    if (err) throw err;
    const moviesData = data.toString().split('\n');
    const firstLine = moviesData.slice(0, 1);
    const movies = moviesData.slice(1, -1).map(movieData => {
      const attrs = movieData.split(',');
      return {
        name: attrs[0],
        year: Number(attrs[1]),
        director: attrs[2]
      }
    });
    const sortedMovies = movies.sort((m1, m2) => {
      if (m1.year < m2.year) {
        return -1;
      } else if (m1.year > m2.year) {
        return 1;
      }
      return 0;
    });
    let sortedMoviesData = sortedMovies.reduce((acum, movie) => {
      return acum + `\n${movie.name},${movie.year},${movie.director}`
    }, '');
    fs.writeFile(pathToWrite, firstLine + sortedMoviesData, (err) => {
      if (err) throw err;
    })
  });
}

writeSortedMovies(`${__dirname}/movies.csv`, `${__dirname}/sorted.csv`);