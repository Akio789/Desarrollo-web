const fs = require('fs');

/**
 * Reads the three files and writes their
 * concatenation in a fourth file.
 */
function concatenate() {
  fs.readFile(`${__dirname}/uno.txt`, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data.toString());
    }
  });
}