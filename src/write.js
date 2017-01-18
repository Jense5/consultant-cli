// @flow

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

/**
 * Writes the given data to the file at the given location. If the file or folder structure does
 * not exist, it will be created. A promise without parameters will be returned.
 * @param {string} location The location of the output file.
 * @param {string} data The data to write to the file.
 * @returns {Promise<>} A promise without parameters.
 */
const write = (location: string, data: string): Promise<> =>
  new Promise((resolve, reject) => {
    const dir = path.dirname(location);
    mkdirp(dir, (issue) => {
      if (issue) { return reject(issue); }
      return fs.writeFile(location, data, (error) => {
        if (error) { return reject(error); }
        return resolve();
      });
    });
  });

export default write;
