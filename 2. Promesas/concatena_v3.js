const fs = require('fs');
const util = require('util');

const createReadFilePromise = util.promisify(fs.readFile);
const createWriteFilePromise = util.promisify(fs.writeFile);

/**
 * Reads the three files and writes their
 * concatenation in a fourth file.
 */
async function concatenate() {
  try {
    let result = '';
    let uno = await createReadFilePromise(`${__dirname}/uno.txt`);
    result += uno.toString();
    let dos = await createReadFilePromise(`${__dirname}/dos.txt`);
    result += dos.toString();
    let tres = await createReadFilePromise(`${__dirname}/tres.txt`);
    result += tres.toString();
    await createWriteFilePromise(`${__dirname}/cuatro.txt`, result);
    console.log('Ok');
  } catch (err) {
    console.error(err);
  } finally {
    console.log('End');
  }
}

concatenate();