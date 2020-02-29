const fs = require('fs');
const util = require('util');

const createReadFilePromise = util.promisify(fs.readFile);
const createWriteFilePromise = util.promisify(fs.writeFile);

/**
 * Reads the three files and writes their
 * concatenation in a fourth file.
 */
function concatenate() {
  let result = '';
  createReadFilePromise(`${__dirname}/uno.txt`)
    .then(data => {
      result += data.toString();
      return createReadFilePromise(`${__dirname}/dos.txt`);
    })
    .then(data => {
      result += data.toString();
      return createReadFilePromise(`${__dirname}/tres.txt`);
    })
    .then(data => {
      result += data.toString();
      return createWriteFilePromise(`${__dirname}/cuatro.txt`, result);
    })
    .then(() => {
      console.log('Ok');
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      console.log('End');
    })
}

concatenate();